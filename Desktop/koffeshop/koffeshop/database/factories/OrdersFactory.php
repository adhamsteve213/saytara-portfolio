<?php

namespace Database\Factories;

use App\Models\orders;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrdersFactory extends Factory
{
    protected $model = orders::class;

    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 10.00, 100.00);
        $tax = $subtotal * 0.1;
        $total = $subtotal + $tax;

        return [
            'user_id' => User::factory(),
            'order_number' => 'ORD-' . date('Ymd') . '-' . strtoupper(fake()->bothify('???###')),
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'cancelled']),
            'payment_status' => fake()->randomElement(['unpaid', 'paid', 'refunded']),
            'payment_method' => fake()->randomElement(['cash', 'credit_card', 'debit_card', 'mobile_payment']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
