<?php

namespace App\Http\Controllers;
use App\Models\Serving;
use App\Models\Service;
use App\Models\Order;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class ServingController extends Controller
{
    public function topten(Request $request)
    {
        $offers = DB::table('ratings')->join("orders", "ratings.order_id", "=", "orders.id")
                    ->rightJoin("servings",[["orders.seller_id" ,"=", "servings.seller_id"],["orders.service","=","servings.service"]])
                    ->join("sellers","servings.seller_id" ,"=", "sellers.id")
                    ->select("servings.seller_id", "orders.id", "ratings.value as val","servings.service", "sellers.location",
                             "servings.price",  "servings.snippet", "servings.discount","sellers.first_name",  "sellers.last_name")
                    ->orderBy('val', 'DESC')->limit(10)->get();
                   
         return response()->json(["offers" => $offers]);
    } 
    
    public function topfour(Request $request)
    {
        $services = Service::where("status","active")->get();
        $all =  [];
        foreach ($services as $value){
            $serving = DB::table("ratings")->join("orders", "ratings.order_id", "=", "orders.id")
                        ->rightJoin("servings",[["orders.seller_id", "=", "servings.seller_id"],["orders.service","=","servings.service"]])
                        ->join("sellers","servings.seller_id" ,"=", "sellers.id")
                        ->where("servings.service","=",$value["name"])
                        ->select(DB::raw("servings.seller_id as id, servings.service, servings.price, servings.snippet,
                            servings.discount, sellers.first_name, sellers.last_name, SUM(ratings.value) as
                            sum, orders.id as order_id, servings.service, COUNT(*) as al"))
                         ->groupBy('servings.seller_id',"servings.service")
                         ->orderByRaw("sum desc, al desc")
                         ->limit(4)->get();
            array_push($all,[$value["name"],$serving]);
            
        }
         return response()->json(["offers" => $all]);
    } 

    public function getbyservice(Request $request)
    {
        
        $offers = Serving::join("sellers","servings.seller_id","=","sellers.id")
        ->where("servings.service",$request["service"])
        ->get();
        return response()->json(["offers" => $offers]);
        
    }
    public function getbyseller(Request $request)
    {
        $offers = Serving::with("orders")->where("servings.seller_id",$request["id"])->get();
        return response()->json(["offers" => $offers]); 
        
    }
    public function getone(Request $request)
    {
        $orders = Order::leftJoin("ratings","orders.id","=","ratings.order_id")
        ->where([["orders.seller_id", "=", $request["id"]],["orders.service","=",$request["service"]]])
        ->select("orders.id","ratings.value")
        ->get();
        
        //error_log( print_r(count($orders), TRUE) );
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
        
        $offer = Serving::where([["servings.seller_id","=",$request["id"]],["servings.service","=",$request["service"]]])
                ->first();
        return response()->json(["offer" => $offer,"rating" =>[$total,$num] ]);
        
    }

    public function create(Request $request)
    {
        $offer = Serving::create([
                    "service"=>$request["service"],
                    "seller_id"=>$request["seller_id"],
                    "price"=>$request["price"],
                    "snippet"=>$request["snippet"],
                    "details"=>$request["details"],
                    "discount"=>$request["discount"],
            ]);
        
        $seller_id = $offer["seller_id"];
        $service = $offer["service"];
        $result = $request->file("image")->storeOnCloudinaryAs("services", "{$seller_id}_{$service}");
         
        return response()->json(["offer" => $offer]);
        
    }
    
    public function update(Request $request)
    {
        $offer = Serving::where([["seller_id","=",$request["seller_id"]],["service","=",$request["service"]]])
                ->update([
                    "price"=>$request["price"],
                    "snippet"=>$request["snippet"],
                    "details"=>$request["details"],
                    "discount"=>$request["discount"],
                ]);
        return response()->json(["offer" => $offer]);
        
    }

    public function delete(Request $request)
    {
        $offer = Serving::where([["seller_id","=",$request["id"]],["service","=",$request["service"]]])
                ->delete();
        return response()->json(["offer" => $offer]);
        
    }


}
