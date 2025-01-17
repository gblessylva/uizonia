<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserRole {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request                                                                          $request
	 * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
	 * @param  string|array                                                                                      $roles
	 * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
	 */
	public function handle( Request $request, Closure $next, $roles ) {
		if ( ! Auth::check() ) {
			return redirect()->route( 'login' );
		}

		$user = Auth::user();

		if ( ! in_array( $user->role, (array) $roles ) ) {
			return redirect()->route( 'unauthorized' );
		}

		return $next( $request );
	}
}
