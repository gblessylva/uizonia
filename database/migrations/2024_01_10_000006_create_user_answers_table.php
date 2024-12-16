<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
	public function up() {
		Schema::create(
			'user_answers',
			function ( Blueprint $table ) {
				$table->id();
				$table->foreignId( 'exam_attempt_id' )->constrained()->onDelete( 'cascade' );
				$table->foreignId( 'question_id' )->constrained()->onDelete( 'cascade' );
				$table->text( 'answer' );
				$table->integer( 'score' )->nullable();
				$table->timestamps();
			}
		);
	}

	public function down() {
		Schema::dropIfExists( 'user_answers' );
	}
};
