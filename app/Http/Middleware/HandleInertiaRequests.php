<?php

namespace App\Http\Middleware;

use App\Services\BreadcrumbService;
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
	protected BreadcrumbService $breadcrumbService;

	public function __construct( BreadcrumbService $breadcrumbService ) {
		$this->breadcrumbService = $breadcrumbService;
	}

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
			'auth'       => array(
				'user' => $request->user(),
			),
			'flash'      => array(
				'message' => fn () => $request->session()->get( 'message' ),
			),
			'breadcrumb' => $this->breadcrumbService->generate( $request ),
			'ziggy'      => fn () => array(
				...( new Ziggy() )->toArray(),
				'location' => $request->url(),
			),
		);
	}
}
