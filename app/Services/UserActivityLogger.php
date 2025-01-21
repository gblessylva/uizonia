<?php

namespace App\Services;

use App\Models\UserActivityLog;
use Illuminate\Support\Facades\Auth;

class UserActivityLogger {

	public function log( string $action, string $description, ?int $reference_id = null ): void {
		$user = Auth::user();

		UserActivityLog::create(
			array(
				'user_id'      => $user->id,
				'action'       => $action,
				'description'  => $description,
				'reference_id' => $reference_id,
			)
		);
	}
}
