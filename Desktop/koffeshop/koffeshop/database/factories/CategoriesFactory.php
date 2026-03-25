<?php

namespace Database\Factories;

use App\Models\categories;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoriesFactory extends Factory
{
    protected $model = categories::class;

    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Coffee',
                'Tea',
                'Pastries',
                'Sandwiches',
                'Desserts',
                'Cold Drinks',
                'Hot Drinks',
                'Breakfast'
            ]),
            'description' => fake()->sentence(),
            'image' => fake()->imageUrl(640, 480, 'food', true),
            'is_active' => true,
        ];
    }
}
