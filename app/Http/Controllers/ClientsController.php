<?php

namespace App\Http\Controllers;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Console\Input\Input;

class ClientsController extends Controller
{

    public function getAll(Request $request){
        $clients = Client::get();
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
            'first_name' => [ 'string', 'max:50'],
            'last_name' => [ 'string', 'max:50'],
            'phone' => [ 'string', 'max:50'],
            'address' => ['string', 'max:250'],
            'email' => ['unique:clients',"email"],
           ]);
        
            $data = $request->only("first_name","last_name","email","phone");
            $filterData = array_filter($data);
           
           if(Auth::guard("client")->user() && Auth::guard("client")->user()["id"] == $request["id"] ){
                $client = Client::where("id",$request->input("id"))->update($filterData);
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
