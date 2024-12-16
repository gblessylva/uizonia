<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Admin\Exam;
class Score extends Model {

	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = array(
		'user_id',
		'exam_id',
		'score',
		'attempted_at',
		'question_scores',
	);

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array<string, string>
	 */
	protected $casts = array(
		'question_scores' => 'array',
		'attempted_at'    => 'datetime',
	);

	/**
	 * Get the user associated with the score.
	 */
	public function user() {
		return $this->belongsTo( User::class );
	}

	/**
	 * Get the exam associated with the score.
	 */
	public function exam() {
		return $this->belongsTo( Exam::class );
	}
}
