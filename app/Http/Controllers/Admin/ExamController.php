<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin\Exam;
use App\Models\Admin\Subject;
use App\Models\Admin\Organizer;
use App\Models\Admin\ExamYear;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class ExamController extends Controller {

	public function create() {
		// Fetch the required options for the form
		$subjects   = Subject::all( array( 'id', 'name' ) );
		$organizers = Organizer::all( array( 'id', 'name' ) );
		$years      = ExamYear::pluck( 'year' )->toArray(); // Or generate a range dynamically

		return Inertia::render(
			'Admin/Exams/Create',
			array(
				'subjects'   => $subjects,
				'organizers' => $organizers,
				'years'      => $years,
			)
		);
	}

	public function store( Request $request ) {
		// Validate the form input
		$validatedData = $request->validate(
			array(
				'subject_id'   => 'required|exists:subjects,id',
				'organizer_id' => 'required|exists:organizers,id',
				'year'         => 'required|integer',
				'type'         => 'required|in:essay,objective,subjective',
				'duration'     => 'integer|min:1',
				'title'        => 'required|string|max:255',
			)
		);

		// Save the exam
		Exam::create( $validatedData );

		// Redirect back with a success message
		return redirect()->route( 'admin.dashboard' )->with( 'success', 'Exam created successfully.' );
	}

	public function index() {
		// Fetch exams with related data
		$exams = Exam::with( array( 'subject', 'organizer' ) )
			->withCount( 'questions' ) // Add the count of questions
			->paginate( 10 );

		// Return the data to the frontend with Inertia
		return Inertia::render(
			'Admin/Exams/ExamIndex',
			array(
				'exams' => $exams->map(
					function ( $exam ) {
						return array(
							'id'              => $exam->id,
							'title'           => $exam->title,
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
			)
		);
	}
	/**
	 * View a specific exam by ID.
	 */
	public function show( $id ) {
		$exam = Exam::with( array( 'subject', 'organizer', 'questions' ) )->findOrFail( $id );

		return Inertia::render(
			'Admin/Exams/ExamView',
			array(
				'exam' => array(
					'id'        => $exam->id,
					'title'     => $exam->title,
					'subject'   => $exam->subject->name,
					'organizer' => $exam->organizer->name,
					'year'      => $exam->year,
					'type'      => $exam->type,
					'duration'  => $exam->duration,
					'questions' => $exam->questions,
				),
			)
		);
	}

	/**
	 * Delete an exam.
	 */
	public function destroy( $id ) {
		$exam = Exam::findOrFail( $id );
		$exam->delete();

		return redirect()->route( 'exams.index' )->with( 'success', 'Exam deleted successfully.' );
	}

	/**
	 * Update an exam.
	 */
	public function update( Request $request, $id ) {
		$exam = Exam::findOrFail( $id );

		$validated = $request->validate(
			array(
				'subject_id'        => 'required|exists:subjects,id',
				'exam_organizer_id' => 'required|exists:exam_organizers,id',
				'year'              => 'required|integer',
				'type'              => 'required|in:essay,objective,subjective',
				'title'             => 'required|string|max:255',
				'duration'          => 'required|integer|min:1',
			)
		);

		$exam->update( $validated );

		return redirect()->route( 'exams.index' )->with( 'success', 'Exam updated successfully.' );
	}

	public function api() {
		return Exam::all();  // Or use pagination if needed.
	}

	
}
