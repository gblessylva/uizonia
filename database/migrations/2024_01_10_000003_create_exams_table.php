<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
	public function up() {
		if ( ! Schema::hasTable( 'exams' ) ) {
			Schema::create(
				'exams',
				function ( Blueprint $table ) {
					$table->id();
					$table->foreignId( 'subject_id' )->constrained()->onDelete( 'cascade' );
					$table->foreignId( 'organizer_id' )->constrained()->onDelete( 'cascade' );
					$table->year( 'year' );
					$table->enum( 'type', array( 'essay', 'objective', 'subjective' ) );
					$table->string( 'title' );
					$table->integer( 'duration' )->comment( 'Duration in minutes' );
					$table->json( 'question_ids' )->nullable(); // Store question IDs as JSON array
					$table->timestamps();
				}
			);
		}

		Schema::create(
			'questions',
			function ( Blueprint $table ) {
				$table->id();
				$table->foreignId( 'exam_id' )->constrained( 'exams' )->onDelete( 'cascade' );
				$table->text( 'question_text' );
				$table->json( 'options' )->nullable();
				$table->string( 'correct_answer' );
				$table->integer( 'score' );
				$table->timestamps();
			}
		);
	}

	public function down() {
		Schema::dropIfExists( 'questions' );
		Schema::dropIfExists( 'exams' );
	}
};
