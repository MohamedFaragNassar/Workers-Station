<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;
class RatingController extends Controller
{
    public function create(Request $request){
        $check = Rating::where("order_id",$request["id"])->count() > 0;
        if($check){
            Rating::where("order_id",$request["id"])->update([
                "value" => $request["value"],
            ]);
        }else{
            Rating::create([
                "value" => $request["value"],
                "order_id" => $request["id"],
            ]);
        }

        return response()->json(["success" => true]);
    }
}
