<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Question;
use App\Models\Admin\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller {

	public function index() {
		$questions = Question::with( 'exam' )->paginate( 10 );

		return Inertia::render(
			'Admin/Questions/Index',
			array(
				'questions' => $questions->items(),
			)
		);
	}

	public function show( $id ) {
		$question = Question::with( 'exam' )->findOrFail( $id );

		return Inertia::render(
			'Admin/Questions/ViewQuestion',
			array(
				'question' => $question,
			)
		);
	}

	public function create() {
		$exams = Exam::all();

		return Inertia::render(
			'Admin/Questions/Create',
			array(
				'exams' => $exams,
			)
		);
	}

	public function store( Request $request ) {
		$validated = $request->validate(
			array(
				'exam_id'        => 'required|exists:exams,id',
				'question_text'  => 'required|string',
				'correct_answer' => 'required|string',
				'score'          => 'required|integer',
				'options'        => 'nullable|array',
			)
		);

		Question::create( $validated );

		return redirect()->route( 'questions.index' )->with( 'success', 'Question created successfully.' );
	}

	public function edit( $id ) {
		$question = Question::findOrFail( $id );
		$exams    = Exam::all();

		return Inertia::render(
			'Admin/Questions/EditQuestion',
			array(
				'question' => $question,
				'exams'    => $exams,
			)
		);
	}

	public function update( Request $request, $id ) {
		$validated = $request->validate(
			array(
				'exam_id'        => 'required|exists:exams,id',
				'question_text'  => 'required|string',
				'correct_answer' => 'required|string',
				'score'          => 'required|integer',
				'options'        => 'nullable|array',
			)
		);

		$question = Question::findOrFail( $id );
		$question->update( $validated );

		return redirect()->route( 'questions.index' )->with( 'success', 'Question updated successfully.' );
	}

	public function destroy( $id ) {
		$question = Question::findOrFail( $id );
		$question->delete();

		return redirect()->route( 'questions.index' )->with( 'success', 'Question deleted successfully.' );
	}

	public function take() {

		$questions = Question::all();
		// return response()->json( $questions );
		return Inertia::render(
			'User/Exams/Index',
			array(
				'questions' => $questions,
			)
		);
	}

    public function api() {

		$questions = Question::all();

		return response()->json( $questions );
		// return Inertia::render(
		// 	'User/Exams/Index',
		// 	array(
		// 		'questions' => $questions,
		// 	)
		// );
	}
}
