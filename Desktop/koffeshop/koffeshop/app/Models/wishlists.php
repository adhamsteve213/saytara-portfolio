<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class wishlists extends Model
{
    protected $table = 'wishlists';
    protected $fillable = ['user_id', 'product_id'];
}
