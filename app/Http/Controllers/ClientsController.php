<?php

namespace App\Http\Controllers;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientsController extends Controller
{

    public function getAll(Request $request){
        $clients = Client::get();
            error_log( print_r("mmmmmmmmmmmmmmm", TRUE) );

        return response()->json(["users" => $clients]); 
    }

    public function delete(Request $request){
        return Client::where("id",$request["id"])->delete();
    }
    
    public function getone(Request $request)
    {
        
        $client = Client::where("id",$request->input("id"))->first();
        return response()->json(["client" => $client]);
    }
    
    public function update(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'string', 'max:50'],
            'address' => ['string', 'max:250'],
            'email' => ['required','unique:clients',"email"],
           ]);
        
            
           if(Auth::guard("client")->user() && Auth::guard("client")->user()["id"] == $request["id"] ){
                $client = Client::where("id",$request->input("id"))->update([
                    "first_name"=>$request->input("first_name"),
                    "last_name"=>$request->input("last_name"),
                    "email"=>$request->input("email"),
                    "phone"=>$request->input("phone"),
                ]);
                $updatedClient =  Client::where("id",$request->input("id"))->first();
                return response()->json(["client" => $updatedClient]);
           }
       
            return response()->json(["error" => "unauthnticated"],401);
      
       
    }

    public function uploadProfile(Request $request) {
        $id = $request->query('id');
        $result = $request->file("image")->storeOnCloudinaryAs("profiles/clients", "{$id}");
        return response()->json(["success" => true]);

    }

}
