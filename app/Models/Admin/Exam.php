<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model {

	use HasFactory;

	protected $fillable = array(
		'subject_id',
		'organizer_id',
		'year',
		'type',
		'duration',
		'title',
	);

	// Relationships
	public function subject() {
		return $this->belongsTo( Subject::class );
	}

	public function organizer() {
		return $this->belongsTo( Organizer::class );
	}
	public function year() {
		return $this->belongsTo( ExamYear::class );
	}
	public function questions() {
		return $this->hasMany( Question::class );
	}
}
