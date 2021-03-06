<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\PseudoTypes\True_;

class SellersController extends Controller
{

    public function getAll(Request $request){
        $sellers = Seller::get();
        return response()->json(["users" => $sellers]); 
    }
    
    public function delete(Request $request){
        return Seller::where("id",$request["id"])->delete();
    }

    public function getone(Request $request)
    {
        
        $orders = Order::leftJoin("ratings","orders.id","=","ratings.order_id")
        ->where("orders.seller_id", $request["id"])
        ->select("orders.id","ratings.value")
        ->get();

        $ratings = [];

        foreach($orders as $order){
           if($order->value){
               array_push($ratings,$order->value);
            }
            
        }
        
        $total = 0;
        $num = count($ratings);
        //error_log( print_r($ratings, TRUE) );
        if($num > 0){
            //error_log( print_r($ratings, TRUE) );
            foreach($ratings as $rating){
                $total += $rating;
            }
        }
        
        $seller = Seller::where("id",$request->input("id"))->first();
        return response()->json(["seller" => $seller,"rating" =>[$total,$num]]);
    } 

    public function update(Request $request)
    {
        $validated = $request->validate([
            'first_name' => [ 'string', 'max:50'],
            'last_name' => [ 'string', 'max:50'],
            'phone' => [ 'string', 'max:50'],
            'location' => ['string', 'max:250'],
            'daily_start' => ['string', 'max:50'],
            'daily_end' => ['string', 'max:50'],
            'email' => ['unique:clients',"email"],
           ]);
        
            $data = $request->only("first_name","last_name","email","phone","daily_start","daily_end");
            $filterData = array_filter($data);
           
            
           if(Auth::guard("seller")->user() && Auth::guard("seller")->user()["id"] == $request["id"] ){
                $seller = Seller::where("id",$request->input("id"))->update($filterData);
                $updatedSeller =  Seller::where("id",$request->input("id"))->first();
                return response()->json(["seller" => $updatedSeller]);
           }
       
            return response()->json(["error" => "unauthnticated"],401);
      
       
    }

    public function uploadProfile(Request $request) {
        $id = $request->query('id');
        $result = $request->file("image")->storeOnCloudinaryAs("profiles/sellers", "{$id}");
        return response()->json(["success" => true]);

    }
}
