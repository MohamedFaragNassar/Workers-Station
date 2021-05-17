<?php

namespace App\Http\Controllers;
use App\Models\Service;
use App\Models\Serving;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServicesController extends Controller
{
    protected $guarded = [];  

    public function allservices(Request $request)
    {
        $services = Service::where("status","active")->get();
        return response()->json(["services" => $services]);
       
    } 
    
    public function adminservices(Request $request)
    {
        $data = [];
        $services = Service::where("status","active")->get();
        foreach($services as $service){
            $offers = Serving::where("service",$service["name"])->count();
            array_push($data,[$service,$offers]);
        }
        return response()->json(["services" => $data]);
    } 
    
    public function search(Request $request)
    {
        $searchTerm = $request["keyword"];
        $services = Service::where('name', 'LIKE', "%{$searchTerm}%")->get();
        return response()->json(["result" => $services]);
       
    } 

    public function create (Request $request){
        return Service::create([
            "name"=>$request["name"]
        ]);
    }
    
    public function delete (Request $request){
        error_log( print_r($request["name"], TRUE) );

        return Service::where("name",$request["name"])->delete();
    }
}
