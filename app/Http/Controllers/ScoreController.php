<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller {

	/**
	 * Display a listing of scores.
	 */
	public function index() {
		$scores = Score::with( array( 'user', 'exam' ) )->get();
		return response()->json( $scores );
	}

	/**
	 * Store a new score.
	 */
	public function store( Request $request ) {
		$validated = $request->validate(
			array(
				'user_id'         => 'required|exists:users,id',
				'exam_id'         => 'required|exists:exams,id',
				'score'           => 'required|numeric|min:0',
				'question_scores' => 'nullable|array',
				'attempted_at'    => 'nullable|date',
			)
		);

		$score = Score::create( $validated );

		return response()->json( $score, 201 );
	}

	/**
	 * Display a specific score.
	 */
	public function show( Score $score ) {
		return response()->json( $score->load( array( 'user', 'exam' ) ) );
	}

	/**
	 * Update a specific score.
	 */
	public function update( Request $request, Score $score ) {
		$validated = $request->validate(
			array(
				'score'           => 'sometimes|numeric|min:0',
				'question_scores' => 'nullable|array',
				'attempted_at'    => 'nullable|date',
			)
		);

		$score->update( $validated );

		return response()->json( $score );
	}

	/**
	 * Delete a specific score.
	 */
	public function destroy( Score $score ) {
		$score->delete();

		return response()->json( array( 'message' => 'Score deleted successfully' ) );
	}
}
