<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post("/api/sellerlogin","Auth\LoginController@sellerlogin");
Route::post("/api/clientlogin","Auth\LoginController@clientlogin");
Route::post("/api/logout","Auth\LoginController@logout");
Route::post("/api/createseller","Auth\RegisterController@createseller");
Route::post("/api/createclient","Auth\RegisterController@createclient");


//Route::post("/api/adminlogin","Auth\LoginController@adminLogin");
Route::post('/adminlogin', [ 'as' => 'login', 'uses' => 'Auth\LoginController@adminLogin']);
//Route::post('/api/adminlogin', 'Auth\LoginController@adminLogin');


Route::get("/api/clients","ClientsController@getAll")->middleware('auth:admin');
Route::get("/api/sellers","SellersController@getAll")->middleware('auth:admin');

Route::get("/api/adminservices","ServicesController@adminservices")->middleware('auth:admin');
Route::get("/api/adminlocations","LocationsController@adminLocation")->middleware('auth:admin');

Route::post("/api/createadmin","Auth\RegisterController@createAdmin")->middleware('auth:admin');

Route::post("/api/addservice","ServicesController@create")->middleware('auth:admin');
Route::post("/api/deleteservice","ServicesController@delete")->middleware('auth:admin');

Route::post("/api/addlocation","LocationsController@create")->middleware('auth:admin');
Route::post("/api/deletelocation","LocationsController@delete")->middleware('auth:admin');

Route::post("/api/deleteclient","ClientsController@delete")->middleware('auth:admin');
Route::post("/api/deleteseller","SellersController@delete")->middleware('auth:admin');

Route::get("/api/allservices","ServicesController@allservices");
Route::post("/api/search","ServicesController@search");
Route::post("/api/client","ClientsController@getone");
Route::post("/api/updateclient","ClientsController@update");
Route::post("/api/clientprofile","ClientsController@uploadProfile")->middleware('auth:client');
Route::post("/api/updateseller","SellersController@update");
Route::post("/api/sellerprofile","SellersController@uploadProfile")->middleware('auth:seller');
Route::post("/api/seller","SellersController@getone");

Route::post("/api/clientorders","OrdersController@getbyclient");
Route::post("/api/sellerorders","OrdersController@getbyseller");
Route::post("/api/addorder","OrdersController@make")->middleware('auth:client');
Route::post("/api/updateorder","OrdersController@update")->middleware('auth:seller');
Route::post("/api/rating","RatingController@create")->middleware('auth:client');

Route::get("/api/toptenrated","ServingController@topten");
Route::get("/api/topfourrated","ServingController@topfour");
Route::post("/api/addserving","ServingController@create")->middleware('auth:seller');
Route::get("/api/locations","LocationsController@getall");
Route::post("/api/service","ServingController@getbyservice");
Route::post("/api/sellerserving","ServingController@getbyseller");
Route::post("/api/updateserving","ServingController@update")->middleware('auth:seller');
Route::post("/api/deleteserving","ServingController@delete")->middleware('auth:seller');
Route::post("/api/offer","ServingController@getone");
Route::view('/admin',"app")->middleware('auth:admin');
Route::view('/admin/{path?}',"app")->where('path', '.+')->middleware('auth:admin');
Route::view('/{path?}',"app")->where('path', '.+');
//Route::view('/{path?}',"app")->where('path', '.+')->middleware('auth:sanctum');
/* Auth::routes(); */

/* Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
 */