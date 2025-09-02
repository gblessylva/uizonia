<?php

namespace App\Models;

use App\Models\Admin\Exam;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * ExamAttempt Model
 * 
 * Represents an attempt made by a user to complete an exam.
 * Stores information about the attempt including start/end times and scores.
 */
class ExamAttempt extends Model {

	use HasFactory;

	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'exam_attempts';

	// Fillable attributes for mass assignment.
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = array(
		'user_id',
		'exam_id',
		'started_at',
		'completed_at',
		'score',
		'scores',
	);

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = array(
		'scores' => 'array',
	);

	/**
	 * Get the user associated with the exam attempt.
	 */
	public function user() {
		return $this->belongsTo( User::class );
	}

	/**
	 * Get the exam associated with the exam attempt.
	 */
	public function exam() {
		/**
		 * The exam associated with the exam attempt.
		 *
		 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
		 */
		return $this->belongsTo( Exam::class );
	}

}
