<?php

// app/Http/Controllers/ImageController.php
namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller {

	public function index() {
		$images = Image::all();
		return inertia( 'Images/Index', array( 'images' => $images ) );
	}

	public function store( Request $request ) {
		$request->validate(
			array(
				'title'   => 'required|string|max:255',
				'image'   => 'required|image|max:2048',
				'user_id' => 'required|exists:users,id',
			)
		);

		$filePath = $request->file( 'image' )->store( 'uploads', 'public' );

		$image = Image::create(
			array(
				'title'     => $request->title,
				'file_path' => $filePath,
				'user_id'   => $request->user_id,
			)
		);

		return redirect()->back()->with( 'success', 'Image uploaded successfully.' );
	}
}
