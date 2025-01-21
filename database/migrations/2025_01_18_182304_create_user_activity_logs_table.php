<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up() {
		Schema::create(
			'user_activity_logs',
			function ( Blueprint $table ) {
				$table->id();
				$table->foreignId( 'user_id' )->nullable()->constrained()->onDelete( 'set null' ); // Link to users table.
				$table->string( 'action' ); // Action description.
				$table->string( 'url' )->nullable(); // URL where the action occurred.
				$table->string( 'ip_address' )->nullable(); // User's IP address.
				$table->json( 'request_data' )->nullable(); // Request data (optional).
				$table->timestamps(); // Timestamps.
				$table->unsignedBigInteger( 'reference_id' )->nullable(); // Reference to the related entity (e.g., exam_id).
				$table->string( 'description' ); // User-friendly description.
			}
		);
	}


	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists( 'user_activity_logs' );
	}
};
