<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\Organizer;

class OrganizerController extends Controller {

	public function index() {
		// Fetch organizers from the database
		$organizers = Organizer::all();

		return inertia(
			'Admin/Organizers/Index',
			array(
				'organizers' => $organizers,
			)
		);
	}

	public function create() {
		return inertia( 'Admin/Organizers/Create' );
	}

	public function store( Request $request ) {
		$request->validate(
			array(
				'name'        => 'required|string|max:255',
				'description' => 'nullable|string',
			)
		);

		Organizer::create(
			array(
				'name'        => $request->name,
				'description' => $request->description,
			)
		);

		return redirect()->route( 'organizers.index' )->with( 'success', 'Organizer created successfully!' );
	}
}
