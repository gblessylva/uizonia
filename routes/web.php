<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ExamController;
use App\Http\Controllers\Admin\ExamYearController;
use App\Http\Controllers\Admin\OrganizerController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\UserExamController;
use App\Http\Controllers\User\UserQuestionController;
use App\Http\Middleware\CheckUserRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome Page
Route::get(
	'/',
	function () {
		return Inertia::render(
			'Welcome',
			array(
				'canLogin'       => Route::has( 'login' ),
				'canRegister'    => Route::has( 'register' ),
				'laravelVersion' => Application::VERSION,
				'phpVersion'     => PHP_VERSION,
			)
		);
	}
);

Route::middleware( array( 'auth', CheckUserRole::class . ':admin' ) )->group(
	function () {
		Route::get( '/dashboard/admin', array( AdminController::class, 'admin' ) )->name( 'admin.dashboard' );
	}
);

Route::middleware( array( 'auth', CheckUserRole::class . ':user' ) )->group(
	function () {
		Route::get(
			'/dashboard',
			function () {
				return Inertia::render( 'Dashboard' );
			}
		)->name( 'dashboard' );
	}
);

// Admin Routes
Route::middleware( array( 'auth', CheckUserRole::class . ':admin' ) )->prefix( 'dashboard/admin' )->group(
	function () {
		Route::get( '/', array( AdminController::class, 'admin' ) )->name( 'admin.dashboard' );

		// Exams
		Route::get( '/exams', array( ExamController::class, 'index' ) )->name( 'exams.index' );
		Route::get( '/exams/create', array( ExamController::class, 'create' ) )->name( 'exams.create' );
		Route::post( '/exams', array( ExamController::class, 'store' ) )->name( 'exams.store' );
		Route::get( '/exams/{id}/edit', array( ExamController::class, 'edit' ) )->name( 'exams.edit' );
		Route::put( '/exams/{id}', array( ExamController::class, 'update' ) )->name( 'exams.update' );
		Route::delete( '/exams/{id}', array( ExamController::class, 'destroy' ) )->name( 'exams.destroy' );

		// Organizers
		Route::get( '/organizers', array( OrganizerController::class, 'index' ) )->name( 'organizers.index' );
		Route::get( '/organizers/create', array( OrganizerController::class, 'create' ) )->name( 'organizers.create' );
		Route::post( '/organizers', array( OrganizerController::class, 'store' ) )->name( 'organizers.store' );

		// Exam Years
		Route::get( '/exam-years', array( ExamYearController::class, 'index' ) )->name( 'exam_years.index' );
		Route::get( '/exam-years/create', array( ExamYearController::class, 'create' ) )->name( 'exam_years.create' );
		Route::post( '/exam-years', array( ExamYearController::class, 'store' ) )->name( 'exam_years.store' );
		Route::get( '/exam-years/{id}/edit', array( ExamYearController::class, 'edit' ) )->name( 'exam_years.edit' );
		Route::put( '/exam-years/{id}', array( ExamYearController::class, 'update' ) )->name( 'exam_years.update' );
		Route::delete( '/exam-years/{id}', array( ExamYearController::class, 'destroy' ) )->name( 'exam_years.destroy' );

		// Subjects
		Route::get( '/subjects', array( SubjectController::class, 'index' ) )->name( 'subjects.index' );
		Route::get( '/subjects/create', array( SubjectController::class, 'create' ) )->name( 'subjects.create' );
		Route::post( '/subjects', array( SubjectController::class, 'store' ) )->name( 'subjects.store' );
		Route::get( '/subjects/{id}/edit', array( SubjectController::class, 'edit' ) )->name( 'subjects.edit' );
		Route::put( '/subjects/{id}', array( SubjectController::class, 'update' ) )->name( 'subjects.update' );
		Route::delete( '/subjects/{id}', array( SubjectController::class, 'destroy' ) )->name( 'subjects.destroy' );

		// Questions
		Route::get( '/questions', array( QuestionController::class, 'index' ) )->name( 'questions.index' );
		Route::get( '/question/create', array( QuestionController::class, 'create' ) )->name( 'questions.create' );
		Route::post( '/questions', array( QuestionController::class, 'store' ) )->name( 'questions.store' );
		Route::get( '/questions/{id}/edit', array( QuestionController::class, 'edit' ) )->name( 'questions.edit' );
		Route::put( '/questions/{id}', array( QuestionController::class, 'update' ) )->name( 'questions.update' );
		Route::delete( '/questions/{id}', array( QuestionController::class, 'destroy' ) )->name( 'questions.destroy' );
	}
);

// User Routes.
Route::middleware( array( 'auth', CheckUserRole::class . ':user' ) )->prefix( 'dashboard' )->group(
	function () {
		Route::get( '/exams', array( UserExamController::class, 'index' ) )->name( 'exams.index' );
		Route::get( '/exams/{id}', array( UserExamController::class, 'show' ) )->name( 'exams.show' );
		Route::get( '/exams/{id}/questions', array( UserQuestionController::class, 'index' ) )->name( 'exams.questions' );
	}
);

// Profile Routes (Accessible to All Authenticated Users).
Route::middleware( array( 'auth' ) )->group(
	function () {
		Route::get( '/profile', array( ProfileController::class, 'edit' ) )->name( 'profile.edit' );
		Route::patch( '/profile', array( ProfileController::class, 'update' ) )->name( 'profile.update' );
		Route::delete( '/profile', array( ProfileController::class, 'destroy' ) )->name( 'profile.destroy' );
	}
);

Route::get( '/api/v1/exams', array( ExamController::class, 'api' ) )->name( 'exam.api' );
Route::post( 'dashboard/exams/enroll', array( UserExamController::class, 'enroll' ) )->name( 'exams.enroll' );
Route::post( '/api/v1/exam/score', array( UserQuestionController::class, 'saveScore' ) )
	->name( 'exam.saveScore' )
	->middleware( 'auth' );

// Authentication Routes
require __DIR__ . '/auth.php';
