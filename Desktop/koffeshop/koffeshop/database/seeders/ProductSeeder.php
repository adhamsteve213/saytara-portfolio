<?php

namespace Database\Seeders;

use App\Models\products;
use App\Models\categories;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $hotCoffee = categories::where('name', 'Hot Coffee')->first();
        $icedCoffee = categories::where('name', 'Iced Coffee')->first();
        $tea = categories::where('name', 'Tea')->first();
        $pastries = categories::where('name', 'Pastries')->first();
        $sandwiches = categories::where('name', 'Sandwiches')->first();
        $desserts = categories::where('name', 'Desserts')->first();

        $products = [
            // Hot Coffee
            [
                'category_id' => $hotCoffee->id,
                'name' => 'Espresso',
                'description' => 'Rich and bold espresso shot',
                'price' => 3.50,
                'image' => 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a',
                'stock_quantity' => 100,
                'is_available' => true,
                'size' => 'small',
                'is_featured' => true,
            ],
            [
                'category_id' => $hotCoffee->id,
                'name' => 'Cappuccino',
                'description' => 'Espresso with steamed milk and foam',
                'price' => 4.50,
                'image' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d',
                'stock_quantity' => 100,
                'is_available' => true,
                'size' => 'medium',
                'is_featured' => true,
            ],
            [
                'category_id' => $hotCoffee->id,
                'name' => 'Latte',
                'description' => 'Smooth espresso with steamed milk',
                'price' => 4.75,
                'image' => 'https://images.unsplash.com/photo-1561047029-3000c68339ca',
                'stock_quantity' => 100,
                'is_available' => true,
                'size' => 'large',
                'is_featured' => true,
            ],
            [
                'category_id' => $hotCoffee->id,
                'name' => 'Americano',
                'description' => 'Espresso with hot water',
                'price' => 3.75,
                'image' => 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
                'stock_quantity' => 100,
                'is_available' => true,
                'size' => 'medium',
                'is_featured' => false,
            ],
            [
                'category_id' => $hotCoffee->id,
                'name' => 'Mocha',
                'description' => 'Espresso with chocolate and steamed milk',
                'price' => 5.25,
                'image' => 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e',
                'stock_quantity' => 100,
                'is_available' => true,
                'size' => 'large',
                'is_featured' => false,
            ],
            // Iced Coffee
            [
                'category_id' => $icedCoffee->id,
                'name' => 'Iced Latte',
                'description' => 'Cold espresso with milk over ice',
                'price' => 4.95,
                'image' => 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
                'stock_quantity' => 100,
                'is_available' => true,
                'size' => 'large',
                'is_featured' => true,
            ],
            [
                'category_id' => $icedCoffee->id,
                'name' => 'Cold Brew',
                'description' => 'Smooth cold brewed coffee',
                'price' => 4.25,
                'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
                'stock_quantity' => 100,
                'is_available' => true,
                'size' => 'medium',
                'is_featured' => true,
            ],
            // Tea
            [
                'category_id' => $tea->id,
                'name' => 'Green Tea',
                'description' => 'Fresh organic green tea',
                'price' => 3.25,
                'image' => 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9',
                'stock_quantity' => 100,
                'is_available' => true,
                'size' => 'medium',
                'is_featured' => false,
            ],
            [
                'category_id' => $tea->id,
                'name' => 'Chai Latte',
                'description' => 'Spiced tea with steamed milk',
                'price' => 4.50,
                'image' => 'https://images.unsplash.com/photo-1576092768241-dec231879fc3',
                'stock_quantity' => 100,
                'is_available' => true,
                'size' => 'large',
                'is_featured' => false,
            ],
            // Pastries
            [
                'category_id' => $pastries->id,
                'name' => 'Croissant',
                'description' => 'Buttery French croissant',
                'price' => 3.50,
                'image' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
                'stock_quantity' => 50,
                'is_available' => true,
                'size' => null,
                'is_featured' => true,
            ],
            [
                'category_id' => $pastries->id,
                'name' => 'Blueberry Muffin',
                'description' => 'Fresh baked blueberry muffin',
                'price' => 3.25,
                'image' => 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa',
                'stock_quantity' => 50,
                'is_available' => true,
                'size' => null,
                'is_featured' => false,
            ],
            [
                'category_id' => $pastries->id,
                'name' => 'Chocolate Danish',
                'description' => 'Sweet pastry with chocolate',
                'price' => 3.75,
                'image' => 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e',
                'stock_quantity' => 50,
                'is_available' => true,
                'size' => null,
                'is_featured' => false,
            ],
            // Sandwiches
            [
                'category_id' => $sandwiches->id,
                'name' => 'Turkey & Cheese Sandwich',
                'description' => 'Turkey, cheese, lettuce, tomato',
                'price' => 7.95,
                'image' => 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
                'stock_quantity' => 30,
                'is_available' => true,
                'size' => null,
                'is_featured' => false,
            ],
            [
                'category_id' => $sandwiches->id,
                'name' => 'Veggie Wrap',
                'description' => 'Fresh vegetables in a wrap',
                'price' => 6.95,
                'image' => 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f',
                'stock_quantity' => 30,
                'is_available' => true,
                'size' => null,
                'is_featured' => false,
            ],
            // Desserts
            [
                'category_id' => $desserts->id,
                'name' => 'Chocolate Cake',
                'description' => 'Rich chocolate layer cake',
                'price' => 5.50,
                'image' => 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
                'stock_quantity' => 20,
                'is_available' => true,
                'size' => null,
                'is_featured' => true,
            ],
            [
                'category_id' => $desserts->id,
                'name' => 'Cheesecake',
                'description' => 'Classic New York cheesecake',
                'price' => 6.00,
                'image' => 'https://images.unsplash.com/photo-1533134242-f5dbb20eef85',
                'stock_quantity' => 20,
                'is_available' => true,
                'size' => null,
                'is_featured' => true,
            ],
        ];

        foreach ($products as $product) {
            products::create($product);
        }
    }
}
