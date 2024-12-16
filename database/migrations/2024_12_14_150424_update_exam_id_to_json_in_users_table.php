<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
	public function up() {
		Schema::table(
			'users',
			function ( Blueprint $table ) {
				$table->json( 'exam_ids' )->nullable()->after( 'id' ); // Use 'exam_ids' instead of 'exam_id'
			}
		);
	}

	public function down() {
		Schema::table(
			'users',
			function ( Blueprint $table ) {
				$table->dropColumn( 'exam_ids' );
			}
		);
	}

};
