<?php

namespace Database\Factories;

use App\Models\carts;
use App\Models\User;
use App\Models\products;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartsFactory extends Factory
{
    protected $model = carts::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'product_id' => products::factory(),
            'quantity' => fake()->numberBetween(1, 5),
            'price' => fake()->randomFloat(2, 2.50, 15.00),
        ];
    }
}
