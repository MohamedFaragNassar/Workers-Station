<?php

namespace App\Http\Controllers;
use App\Models\Service;
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
    
    public function search(Request $request)
    {
        $searchTerm = $request["keyword"];
        $services = Service::where('name', 'LIKE', "%{$searchTerm}%")->get();
        return response()->json(["result" => $services]);
       
    } 
}
