<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Seller;
use Illuminate\Http\Request;


class LocationsController extends Controller
{

    public function getall(Request $request)
    {
        $locations = Location::where("status","active")->get(); 
        return response()->json(["locations" => $locations]);
        
    }

    public function adminLocation(Request $request)
    {
        $data = [];
        $locations = Location::where("status","active")->get();
        foreach($locations as $location){
            $offers = Seller::where("location",$location["name"])->count();
            array_push($data,[$location,$offers]);
        }
        return response()->json(["locations" => $data]);
    } 
    
    public function create (Request $request){
        return Location::create([
            "name"=>$request["name"]
        ]);
    }
    
    public function delete (Request $request){
        return Location::where("name",$request["name"])->delete();
    }
}
