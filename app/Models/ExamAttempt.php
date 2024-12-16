<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamAttempt extends Model {

	use HasFactory;

	// Table name
	protected $table = 'exam_attempts';

	// Fillable attributes for mass assignment
	protected $fillable = array(
		'user_id',
		'exam_id',
		'started_at',
		'completed_at',
		'score',
	);

	// Relationships
	public function user() {
		return $this->belongsTo( User::class );
	}

	public function exam() {
		return $this->belongsTo( Exam::class );
	}
}
