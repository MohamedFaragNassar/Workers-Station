<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Serving;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\PseudoTypes\True_;
use Illuminate\Support\Facades\Log;

class OrdersController extends Controller
{
    public function getbyclient(Request $request)
    {
        $orders = Order::with("rating")->leftJoin("sellers","orders.seller_id","=","sellers.id")
        ->where("client_id",$request->input("id"))
        ->orderBy("orders.date","DESC")
        ->select("sellers.first_name", "sellers.last_name","orders.*")
        ->get();
        return response()->json(["orders" => $orders]);
    } 
    

    public function getbyseller(Request $request)
    {
        $orders = Order::with("rating")->where("seller_id",$request["id"])->orderBy("date",'DESC')->get();
                        
        return response()->json(["orders" => $orders]);
    } 
    
    public function make(Request $request)
    {
        $serving = Serving::where([["seller_id","=",$request["seller_id"]],["service","=",$request["service"]]])
        ->first();

        //error_log( print_r($serving->discount, TRUE) );
        $discount = $serving->discount;
        if( $discount > 0 ){
            $price = $request["amount"] * ($serving->price - $serving->price*($discount/100));
        }else{
            $price = $request["amount"] * $serving->price;
        }
        
       $fileName = null;
        if($request["image"] != "undefined"){
            $result = $request->file("image")->storeOnCloudinary('orders');
            $fileName = $result->getFileName();
        }
        $orders = Order::create([
            "seller_id" => $request["seller_id"],
            "service" => $request["service"],
            "client_id" => $request["client_id"],
            "amount" => $request["amount"],
            "starts_at" => $request["start"],
            "total_price" => $price,
            "image" => $fileName
        ]);
                        
        return response()->json(["order" => $orders]);
        
       
    } 

    //error_log( print_r($order->seller_id, TRUE) );

    public function update(Request $request){
        $order = Order::where("id",$request["id"])->first();
        if(Auth::guard("seller")->user()["id"]==$order->seller_id){
            if($request["status"]=="rejected"){
                $updatedOrder = Order::where("id",$request["id"])->delete();
            }else{
                $updatedOrder = Order::where("id",$request["id"])->update([
                    "status" => $request["status"]
                ]);
                return response()->json(["order" => $updatedOrder]); 
            }
        }
        return response()->json(["error" => "unauthnticated"],401); 
    }
}
