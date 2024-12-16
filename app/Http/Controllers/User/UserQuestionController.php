<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Admin\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserQuestionController extends Controller {

	/**
	 * Get all questions for a specific exam.
	 *
	 * @param  int $examId
	 * @return \Inertia\Response
	 */
	public function index( $examId ) {
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

	// public function saveScore( Request $request ) {
	// Validate the incoming request
	// $request->validate(
	// array(
	// 'exam_id'    => 'required|integer|exists:exams,id',
	// 'user_score' => 'required|integer|min:0',
	// 'max_score'  => 'required|integer|min:0',
	// )
	// );

	// Get the authenticated user
	// $user = Auth::user();

	// Check if an attempt already exists for this user and exam
	// $existingAttempt = \App\Models\ExamAttempt::where( 'user_id', $user->id )
	// ->where( 'exam_id', $request->exam_id )
	// ->first();

	// if ( $existingAttempt ) {
	// return response()->json(
	// array(
	// 'message' => 'You have already completed this exam.',
	// ),
	// 200
	// );
	// }

	// Create a new exam attempt
	// $examAttempt = \App\Models\ExamAttempt::create(
	// array(
	// 'user_id'      => $user->id,
	// 'exam_id'      => $request->exam_id,
	// 'started_at'   => now(), // Assume the exam started now for simplicity
	// 'completed_at' => now(), // Save the current timestamp for completion
	// 'score'        => $request->user_score,
	// )
	// );

	// return response()->json(
	// array(
	// 'message' => 'Score saved successfully.',
	// 'attempt' => $examAttempt,
	// )
	// );
	// }

	public function saveScore( Request $request ) {
		// Validate the incoming request
		$request->validate(
			array(
				'exam_id'    => 'required|integer|exists:exams,id',
				'user_score' => 'required|integer|min:0',
				'max_score'  => 'required|integer|min:0',
				'scores'     => 'required|array', // JSON for individual question scores
			)
		);

		// Get the authenticated user
		$user = Auth::user();

		// Either update an existing attempt or create a new one
		$examAttempt = \App\Models\ExamAttempt::updateOrCreate(
			array(
				'user_id' => $user->id,
				'exam_id' => $request->exam_id,
			),
			array(
				'started_at'   => now(), // Assume the exam started now for simplicity
				'completed_at' => now(), // Save the current timestamp for completion
				'score'        => $request->user_score, // Total score
				'scores'       => $request->scores,    // JSON object for individual question scores
			)
		);

		// Optionally redirect the user back to the exam details or dashboard with a success message
		return back()->with( 'message', 'Score saved successfully.' );
	}
}
