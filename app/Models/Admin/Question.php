<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model {

	use HasFactory;

	protected $fillable = array(
		'exam_id',
		'question_text',
		'correct_answer',
		'score',
		'options',
	);

	protected $casts = array(
		'options' => 'array',
	);

	public function exam() {
		return $this->belongsTo( Exam::class );
	}
}
