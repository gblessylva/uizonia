<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
	public function up() {
		Schema::create(
			'exam_attempts',
			function ( Blueprint $table ) {
				$table->id();
				$table->foreignId( 'user_id' )->constrained()->onDelete( 'cascade' );
				$table->foreignId( 'exam_id' )->constrained()->onDelete( 'cascade' );
				$table->timestamp( 'started_at' )->nullable();
				$table->timestamp( 'completed_at' )->nullable();
				$table->integer( 'score' )->nullable();
				$table->integer( 'scores' )->nullable();
				$table->timestamps();
			}
		);
	}

	public function down() {
		Schema::dropIfExists( 'exam_attempts' );
	}
};
