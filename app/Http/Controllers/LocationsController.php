<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;


class LocationsController extends Controller
{

    public function getall(Request $request)
    {
        $locations = Location::where("status","active")->get(); 
        return response()->json(["locations" => $locations]);
        
    }
    
}
