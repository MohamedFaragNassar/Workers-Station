<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Client extends Authenticatable
{
    use HasFactory, Notifiable;
    public $timestamps = false;
    protected $guard = 'client';
    protected $fillable = [
        "email","first_name","last_name","phone","address","password"
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
	 	
    

}
