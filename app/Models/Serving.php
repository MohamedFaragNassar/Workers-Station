<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;

class Serving extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        "seller_id","service","price","snippet","details","discount",	
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, "seller_id","service");
    }
}