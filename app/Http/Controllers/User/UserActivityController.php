<?php
namespace App\Http\Controllers\User;

use App\Models\Admin\Exam;
use App\Models\UserActivityLog;
use App\Services\UserActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class UserActivityController extends Controller {

	protected $logger;

	public function __construct( UserActivityLogger $logger ) {
		$this->logger = $logger;
	}

	// Get recent activities for the dashboard
	public function recent() {
		$activities = UserActivityLog::where( 'user_id', Auth::id() )
			->latest()
			->select( 'description', 'created_at' )
			->take( 5 )
			->get();

		return $activities;
	}

	// Log enrollment activity
	public function enroll( Request $request ) {
		$request->validate(
			array(
				'reference_id' => 'required|exists:exams,id',
				'action'       => 'required|string',
				'description'  => 'required|string',
			)
		);

		$exam = Exam::find( $request->reference_id );
		// Log the activity.
		$this->logger->log(
			$request->action ?? 'enroll_exam',
			$request->description ?? "You enrolled in \"{$exam->title}\".",
			$request->reference_id ?? $exam->id
		);
		// Return a 200 response.
		return redirect()->back()->with( 'success', 'Successfully enrolled in the exam.' );
	}
}
