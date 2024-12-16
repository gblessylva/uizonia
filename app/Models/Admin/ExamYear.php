<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamYear extends Model {

	/** @use HasFactory<\Database\Factories\Admin\ExamYearFactory> */
	use HasFactory;

	protected $fillable = array( 'name', 'year' );
}
