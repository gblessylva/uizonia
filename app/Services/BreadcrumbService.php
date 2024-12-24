<?php

namespace App\Services;

use Illuminate\Http\Request;

class BreadcrumbService {

	/**
	 * Generate the breadcrumb trail based on the current route.
	 *
	 * @param Request $request
	 * @return array
	 */
	public function generate( Request $request ): array {
		$routeName       = $request->route()->getName();
		$routeParameters = $request->route()->parameters();

		$breadcrumb = array(
			array(
				'name' => 'Dashboard',
				'url'  => route( 'dashboard' ),
			),
		);

		// Add "Exams" breadcrumb
		if ( in_array( $routeName, array( 'exams.index', 'exams.show', 'exam.questions' ) ) ) {
			$breadcrumb[] = array(
				'name' => 'Exams',
				 'url'  => $routeName === 'exams.index' ? null : route('exams.index'),
			);
		}

		// Add "Exam Details" breadcrumb
		if ( $routeName === 'exam.show' && isset( $routeParameters['exam'] ) ) {
			$breadcrumb[] = array(
				'name' => 'Exam Details',
				'url'  => null, // Not clickable
			);
		}

		// Add "Questions" breadcrumb
		if ( $routeName === 'exam.questions' && isset( $routeParameters['exam'] ) ) {
			$breadcrumb[] = array(
				'name' => 'Questions',
				'url'  => null, // Not clickable
			);
		}

		return $breadcrumb;
	}
}
