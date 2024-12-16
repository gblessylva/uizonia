<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware {

	/**
	 * The root template that is loaded on the first page visit.
	 *
	 * @var string
	 */
	protected $rootView = 'app';

	/**
	 * Determine the current asset version.
	 */
	public function version( Request $request ): ?string {
		return parent::version( $request );
	}

	/**
	 * Define the props that are shared by default.
	 *
	 * @return array<string, mixed>
	 */
	public function share( Request $request ): array {
		return array(
			...parent::share( $request ),
			'auth'  => array(
				'user' => $request->user(),
			),
			'flash' => array(
				'message' => fn () => $request->session()->get( 'message' ),
			),
			'ziggy' => fn () => array(
				...( new Ziggy() )->toArray(),
				'location' => $request->url(),
			),
		);
	}
}
