<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller {
	public function index() {
		$subjects = Subject::all();

		return inertia(
			'Admin/Subjects/Index',
			array(
				'subjects' => $subjects,
			)
		);
	}

	public function create() {
		return inertia( 'Admin/Subjects/Create' );
	}

	public function store( Request $request ) {
		$request->validate(
			array(
				'name'        => 'required|string|max:255'
			)
		);

		Subject::create( $request->only( array( 'name' ) ) );

		return redirect()->route( 'subjects.index' )->with( 'success', 'Subject created successfully!' );
	}

	public function edit( $id ) {
		$subject = Subject::findOrFail( $id );
		return inertia( 'Admin/Subjects/Edit', array( 'subject' => $subject ) );
	}

	public function update( Request $request, $id ) {
		$request->validate(
			array(
				'name'        => 'required|string|max:255',
				'description' => 'nullable|string',
			)
		);

		$subject = Subject::findOrFail( $id );
		$subject->update( $request->only( array( 'name', 'description' ) ) );

		return redirect()->route( 'subjects.index' )->with( 'success', 'Subject updated successfully!' );
	}

	public function destroy( $id ) {
		Subject::destroy( $id );
		return redirect()->route( 'subjects.index' )->with( 'success', 'Subject deleted successfully!' );
	}
}
