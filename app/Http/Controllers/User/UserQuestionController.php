<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Admin\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\ExamAttempt;
use Illuminate\Support\Facades\Redirect;

class UserQuestionController extends Controller {

	/**
	 * Get all questions for a specific exam.
	 *
	 * @param  int $examId
	 * @return \Inertia\Response
	 */
	public function index( $examId ) {
		// $user = Auth::user();

		// // Check if the examId exists in the user's exam_ids column
		// // Assuming exam_ids is a comma-separated string
		// $examIds = explode( ',', $user->exam_ids ); // Split the string into an array

		// if ( ! in_array( $examId, $examIds ) ) {
		// 	return Redirect::route( 'exams.show', array( 'id' => $examId ) )->with( 'message', 'You do not have access to this exam.' );
		// }
		// Fetch the exam with questions
		$exam = Exam::with( array( 'questions' ) )
					->findOrFail( $examId );

		// Map the questions to format the response
		$questions = $exam->questions->map(
			function ( $question ) {
				return array(
					'id'             => $question->id,
					'title'          => $question->question_text,
					'options'        => $question->options,
					'correct_answer' => $question->correct_answer,
					'score'          => $question->score,
				);
			}
		);

		return Inertia::render(
			'User/Questions/QuestionDetailsPage',
			array(
				'exam' => array(
					'id'              => $exam->id,
					'title'           => $exam->title,
					'questions_count' => $questions->count(),
					'questions'       => $questions,
				),
			)
		);
	}


	public function saveScore( Request $request ) {
		// Validate the incoming request
		$request->validate(
			array(
				'exam_id'    => 'required|integer|exists:exams,id',
				'user_score' => 'required|integer|min:0',
				'max_score'  => 'required|integer|min:0',
				'started_at' => 'required|string',
				'scores'     => 'required|array', // JSON for individual question scores
			)
		);

		// Get the authenticated user
		$user = Auth::user();

		// Either update an existing attempt or create a new one
		ExamAttempt::updateOrCreate(
			array(
				'user_id'      => $user->id,
				'exam_id'      => $request->exam_id,
				'started_at'   => date( 'Y-m-d H:i:s', strtotime( $request->started_at ) ),
				'completed_at' => now(),
				'score'        => $request->user_score, // Total score
				'scores'       => json_encode( $request->scores ),    // JSON object for individual question scores
			)
		);

		// Optionally redirect the user back to the exam details or dashboard with a success message
		return back()->with( 'message', 'Score saved successfully.' );
	}
}
