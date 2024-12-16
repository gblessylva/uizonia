<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScoresTable extends Migration {

	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create(
			'scores',
			function ( Blueprint $table ) {
				$table->id();
				$table->foreignId( 'user_id' )->constrained()->onDelete( 'cascade' );
				$table->foreignId( 'exam_id' )->constrained()->onDelete( 'cascade' );
				$table->float( 'score' )->default( 0 );
				$table->json( 'question_scores' )->nullable(); // Optional breakdown of scores
				$table->timestamp( 'attempted_at' )->nullable();
				$table->timestamps();
			}
		);
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists( 'scores' );
	}
}
