<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class carts extends Model
{
    use HasFactory;

    protected $table = 'carts';

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'price'
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    /**
     * Get the user that owns the cart item.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product that belongs to the cart item.
     */
    public function product()
    {
        return $this->belongsTo(products::class, 'product_id');
    }

    /**
     * Get the subtotal for this cart item.
     */
    public function getSubtotalAttribute()
    {
        return $this->quantity * $this->price;
    }
}
