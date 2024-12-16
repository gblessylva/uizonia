<?php

namespace App\Http\Controllers\User;

use App\Models\Admin\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserExamController extends Controller {

	/**
	 * Display all available exams.
	 */
	public function index() {
		// Get the currently authenticated user
		$user = Auth::user();

		// Fetch exams with required details
		$exams = Exam::with( array( 'subject', 'organizer' ) )
			->withCount( 'questions' ) // Add the count of questions
			->paginate( 10 );

			// Decode the user's enrolled exam IDs (stored as JSON)
		$enrolledExamIds = $user->exam_ids ? json_decode( $user->exam_ids, true ) : array();

		// Return the data to the frontend with Inertia
		return Inertia::render(
			'User/Exams/UserExamIndex',
			array(
				'exams'           => $exams->map(
					function ( $exam ) {
						return array(
							'id'              => $exam->id,
							'title'           => $exam->title,
							'organizer'       => $exam->organizer['name'],
							'subject'         => array(
								'id'   => $exam->subject->id,
								'name' => $exam->subject->name,
							),
							'year'            => $exam->year,
							'type'            => $exam->type,
							'duration'        => $exam->duration,
							'questions_count' => $exam->questions_count,
						);
					}
				),
				'enrolledExamIds' => $enrolledExamIds,
			)
		);
	}


	public function show( $examId ) {
		$exam = Exam::with( array( 'subject', 'organizer' ) )
		->withCount( 'questions' )
		->findOrFail( $examId );

		// Get the authenticated user
		$user = Auth::user();

		// Check if the user is already enrolled in this exam
		$enrolledExams = $user->exam_ids ? json_decode( $user->exam_ids, true ) : array();
		$isEnrolled    = in_array( $exam->id, $enrolledExams );

		return Inertia::render(
			'User/Exams/ExamDetailsPage',
			array(
				'exam'            => array(
					'id'              => $exam->id,
					'title'           => $exam->title,
					'subject'         => $exam->subject->name,
					'organizer'       => $exam->organizer->name,
					'year'            => $exam->year,
					'type'            => $exam->type,
					'duration'        => $exam->duration,
					'questions_count' => $exam->questions_count,
				),
				'enrolledExamIds' => $enrolledExams, // Pass the enrolled exams for UI purposes
			)
		);
	}



	public function enroll( Request $request ) {
		// Validate incoming request
		$validated = $request->validate(
			array(
				'user_id' => 'required|exists:users,id',
				'exam_id' => 'required|exists:exams,id',
			)
		);

		// Find the user
		$user = User::find( $validated['user_id'] );

		// Decode existing exam IDs or initialize an empty array
		$examIds = $user->exam_ids ? json_decode( $user->exam_ids, true ) : array();

		// Add the new exam ID if it's not already present
		if ( ! in_array( $validated['exam_id'], $examIds ) ) {
			$examIds[] = $validated['exam_id'];
		}

		// Save the updated exam IDs back to the database
		$user->exam_ids = json_encode( $examIds );
		$user->save();

		return redirect()->back()->with( 'success', 'Successfully enrolled in the exam.' );
	}
}
