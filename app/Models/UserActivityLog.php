<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserActivityLog extends Model {

	use hasFactory;

	protected $fillable = array(
		'user_id',
		'action',
		'url',
		'ip_address',
		'request_data',
		'reference_id',
		'description',
	);
	public function user() {
		return $this->belongsTo( User::class );
	}
}
