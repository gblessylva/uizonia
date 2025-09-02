<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gblessylva.com',
            'password' => 'password',
            'role' => 'user', 
        ]);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@gblessylva.com',
            'password' => 'password',
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }
}
