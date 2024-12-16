<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\ExamYear;
use Illuminate\Http\Request;

class ExamYearController extends Controller {
	
	public function index() {
		$examYears = ExamYear::all();

		return inertia(
			'Admin/ExamYears/Index',
			array(
				'examYears' => $examYears,
			)
		);
	}

	public function create() {
		return inertia( 'Admin/ExamYears/Create' );
	}

	public function store( Request $request ) {
		$request->validate(
			array(
				'name' => 'required|string|max:255',
				'year' => 'required|integer|digits:4',
			)
		); 

		ExamYear::create( $request->only( array( 'name', 'year' ) ) );

		return redirect()->route( 'exam_years.index' )->with( 'success', 'Exam Year created successfully!' );
	}

	public function edit( $id ) {
		$examYear = ExamYear::findOrFail( $id );
		return inertia( 'Admin/ExamYears/Edit', array( 'examYear' => $examYear ) );
	}

	public function update( Request $request, $id ) {
		$request->validate(
			array(
				'name' => 'required|string|max:255',
				'year' => 'required|integer|digits:4',
			)
		);

		$examYear = ExamYear::findOrFail( $id );
		$examYear->update( $request->only( array( 'name', 'year' ) ) );

		return redirect()->route( 'exam_years.index' )->with( 'success', 'Exam Year updated successfully!' );
	}

	public function destroy( $id ) {
		ExamYear::destroy( $id );
		return redirect()->route( 'exam_years.index' )->with( 'success', 'Exam Year deleted successfully!' );
	}
}
