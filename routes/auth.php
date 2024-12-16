<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware( 'guest' )->group(
	function () {
		Route::get( 'register', array( RegisteredUserController::class, 'create' ) )
		->name( 'register' );

		Route::post( 'register', array( RegisteredUserController::class, 'store' ) );

		Route::get( 'login', array( AuthenticatedSessionController::class, 'create' ) )
		->name( 'login' );

		Route::post( 'login', array( AuthenticatedSessionController::class, 'store' ) );

		Route::get( 'forgot-password', array( PasswordResetLinkController::class, 'create' ) )
		->name( 'password.request' );

		Route::post( 'forgot-password', array( PasswordResetLinkController::class, 'store' ) )
		->name( 'password.email' );

		Route::get( 'reset-password/{token}', array( NewPasswordController::class, 'create' ) )
		->name( 'password.reset' );

		Route::post( 'reset-password', array( NewPasswordController::class, 'store' ) )
		->name( 'password.store' );
	}
);

Route::middleware( 'auth' )->group(
	function () {
		Route::get( 'verify-email', EmailVerificationPromptController::class )
		->name( 'verification.notice' );

		Route::get( 'verify-email/{id}/{hash}', VerifyEmailController::class )
		->middleware( array( 'signed', 'throttle:6,1' ) )
		->name( 'verification.verify' );

		Route::post( 'email/verification-notification', array( EmailVerificationNotificationController::class, 'store' ) )
		->middleware( 'throttle:6,1' )
		->name( 'verification.send' );

		Route::get( 'confirm-password', array( ConfirmablePasswordController::class, 'show' ) )
		->name( 'password.confirm' );

		Route::post( 'confirm-password', array( ConfirmablePasswordController::class, 'store' ) );

		Route::put( 'password', array( PasswordController::class, 'update' ) )->name( 'password.update' );

		Route::post( 'logout', array( AuthenticatedSessionController::class, 'destroy' ) )
		->name( 'logout' );
	}
);
