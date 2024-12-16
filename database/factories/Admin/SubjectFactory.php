<?php

namespace Database\Factories\Admin;

use App\Models\Admin\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin\Subject>
 */
class SubjectFactory extends Factory {
	protected $model = Subject::class;

	public function definition() {
		return array(
			'name'        => $this->faker->word,
			'description' => $this->faker->sentence,
		);
	}
}
