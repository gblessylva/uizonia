<?php

namespace App\Providers;

use App\Services\BreadcrumbService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {

	/**
	 * Register services.
	 *
	 * @return void
	 */
	public function register() {
		$this->app->singleton(
			BreadcrumbService::class,
			function () {
				return new BreadcrumbService();
			}
		);
	}


	/**
	 * Bootstrap any application services.
	 */
	public function boot(): void {
		Vite::prefetch( concurrency: 3 );
	}
}
