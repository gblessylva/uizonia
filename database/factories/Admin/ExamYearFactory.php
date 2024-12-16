<?php

namespace Database\Factories\Admin;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Admin\ExamYear;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin\ExamYear>
 */
class ExamYearFactory extends Factory {
	protected $model = ExamYear::class;

	public function definition() {
		return array(
			'name' => $this->faker->word,
			'year' => $this->faker->year,
		);
	}
}
