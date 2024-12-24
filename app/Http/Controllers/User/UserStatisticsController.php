<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Models\Admin\Subject;
use App\Models\Admin\Exam;
use App\Models\ExamAttempt; // Assumes there's a pivot table or model for user_exam relationship
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserStatisticsController extends Controller {

	/**
	 * Display user statistics.
	 */
	public function index() {
		// Get the authenticated user
		$user = Auth::user();

		// Get all exams the user has enrolled in
		$enrolledExams = ExamAttempt::with( 'exam' )
			->where( 'user_id', $user->id )
			->get();
		$user_exam     = User::whereNotNull( 'exam_ids' )
		->get()
		->sum(
			function ( $user ) {
				return count( json_decode( $user->exam_ids, true ) ?? array() );
			}
		);

		// Calculate user statistics
		$totalExamsEnrolled = $enrolledExams->count();

		$examsData = $enrolledExams->map(
			function ( $userExam ) {
				return array(
					'exam_id'    => $userExam->exam->id,
					'exam_title' => $userExam->exam->title,
					'subject'    => $userExam->exam->subject,
					'score'      => $userExam->score,
					'attempts'   => $userExam->attempts,
					'max_score'  => $userExam->exam->questions->sum( 'score' ),
				);
			}
		);

		// Calculate total scores across all exams
		$totalScore = $enrolledExams->sum( 'score' );
		$total_max  = $examsData->sum( 'max_score' );

		return Inertia::render(
			'Dashboard',
			array(

				'statistics' => array(
					'total_max'            => $total_max,
					'total_exams_enrolled' => $totalExamsEnrolled,
					'total_score'          => $totalScore,
					'exams'                => $examsData,
					'user_exam_count'      => $user_exam,
				),
			)
		);
	}
}
