<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller {

	/**
	 * Display the user's profile form.
	 */
	public function edit( Request $request ): Response {
		return Inertia::render(
			'Profile/Edit',
			array(
				'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
				'status'          => session( 'status' ),
			)
		);
	}
	


	/**
	 * Update the user's profile information.
	 */
	public function update( ProfileUpdateRequest $request ): RedirectResponse {
		// Handle avatar upload

		logger()->info( 'Request Data', $request->all() );
		// dd( $request->all(), $request->file( 'avatar' ) );

		if ( $request->hasFile( 'avatar' ) ) {
			$avatarPath              = $request->file( 'avatar' )->store( 'avatars', 'public' ); // Store avatar in public storage
			$request->user()->avatar = $avatarPath; // Save the path in the database
		}

		// Update other user information
		$request->user()->fill( $request->validated() );

		// // Reset email verification if the email has changed
		if ( $request->user()->isDirty( 'email' ) ) {
			$request->user()->email_verified_at = null;
		}

		$request->user()->save();

		return Redirect::route( 'profile.edit' );
        // return \request()->all();   
	}


	/**
	 * Delete the user's account.
	 */
	public function destroy( Request $request ): RedirectResponse {
		$request->validate(
			array(
				'password' => array( 'required', 'current_password' ),
			)
		);

		$user = $request->user();

		Auth::logout();

		$user->delete();

		$request->session()->invalidate();
		$request->session()->regenerateToken();

		return Redirect::to( '/' );
	}
}
