<?php

namespace Database\Seeders;

use App\Models\categories;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Hot Coffee',
                'description' => 'Fresh brewed hot coffee drinks',
                'image' => 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
                'is_active' => true,
            ],
            [
                'name' => 'Iced Coffee',
                'description' => 'Refreshing iced coffee beverages',
                'image' => 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
                'is_active' => true,
            ],
            [
                'name' => 'Tea',
                'description' => 'Premium tea selection',
                'image' => 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9',
                'is_active' => true,
            ],
            [
                'name' => 'Pastries',
                'description' => 'Fresh baked pastries and breads',
                'image' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
                'is_active' => true,
            ],
            [
                'name' => 'Sandwiches',
                'description' => 'Delicious sandwiches and wraps',
                'image' => 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
                'is_active' => true,
            ],
            [
                'name' => 'Desserts',
                'description' => 'Sweet treats and desserts',
                'image' => 'https://images.unsplash.com/photo-1551024506-0bccd828d307',
                'is_active' => true,
            ],
            [
                'name' => 'Cold Drinks',
                'description' => 'Refreshing cold beverages',
                'image' => 'https://images.unsplash.com/photo-1546173159-315724a31696',
                'is_active' => true,
            ],
            [
                'name' => 'Breakfast',
                'description' => 'Morning breakfast items',
                'image' => 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            categories::create($category);
        }
    }
}
