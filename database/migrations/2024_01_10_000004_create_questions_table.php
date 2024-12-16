<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
	public function up() {
		if ( ! Schema::hasTable( 'questions' ) ) {
			Schema::create(
				'questions',
				function ( Blueprint $table ) {
					$table->id();
					$table->foreignId( 'exam_id' )->constrained()->onDelete( 'cascade' );
					$table->text( 'question_text' );
					$table->text( 'correct_answer' );
					$table->integer( 'score' )->comment( 'Total Points A user gets' );
					$table->json( 'options' )->nullable()->comment( 'For objective questions' );
					$table->timestamps();
				}
			);
		}}

	public function down() {
		Schema::dropIfExists( 'questions' );
	}
};
