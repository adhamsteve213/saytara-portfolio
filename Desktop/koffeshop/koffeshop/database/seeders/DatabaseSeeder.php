<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@koffeshop.com',
            'role' => 'admin',
            'password' => bcrypt('password'), // Password: password
        ]);

        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@koffeshop.com',
            'role' => 'user',
            'password' => bcrypt('password'), // Password: password
        ]);

        // Create additional random users
        User::factory(10)->create();

        // Seed categories and products
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}
