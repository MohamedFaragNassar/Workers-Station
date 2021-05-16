<?php

namespace App\Models;
use App\Models\Rating;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        "starts_at","total_price","amount","status","client_id",'service',"seller_id","image","rating" 		
    ];

    public function rating()
    {
        return $this->hasMany(Rating::class);
    }

}
