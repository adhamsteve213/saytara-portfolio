<?php

namespace Database\Factories;

use App\Models\products;
use App\Models\categories;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductsFactory extends Factory
{
    protected $model = products::class;

    public function definition(): array
    {
        $coffeeNames = ['Espresso', 'Americano', 'Cappuccino', 'Latte', 'Mocha', 'Macchiato'];
        $teaNames = ['Green Tea', 'Black Tea', 'Herbal Tea', 'Chai Latte'];
        $pastryNames = ['Croissant', 'Muffin', 'Donut', 'Danish', 'Bagel'];
        $allNames = array_merge($coffeeNames, $teaNames, $pastryNames);

        return [
            'category_id' => categories::factory(),
            'name' => fake()->randomElement($allNames),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 2.50, 15.00),
            'image' => fake()->imageUrl(640, 480, 'food', true),
            'stock_quantity' => fake()->numberBetween(0, 100),
            'is_available' => fake()->boolean(90),
            'size' => fake()->randomElement(['small', 'medium', 'large', null]),
            'is_featured' => fake()->boolean(20),
        ];
    }
}
