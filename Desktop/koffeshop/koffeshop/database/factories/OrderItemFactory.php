<?php

namespace Database\Factories;

use App\Models\OrderItem;
use App\Models\orders;
use App\Models\products;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    protected $model = OrderItem::class;

    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 5);
        $price = fake()->randomFloat(2, 2.50, 15.00);
        $subtotal = $quantity * $price;

        return [
            'order_id' => orders::factory(),
            'product_id' => products::factory(),
            'quantity' => $quantity,
            'price' => $price,
            'subtotal' => $subtotal,
        ];
    }
}
