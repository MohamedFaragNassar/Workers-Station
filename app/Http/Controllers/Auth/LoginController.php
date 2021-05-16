<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
        {
            $this->middleware('guest')->except('logout');
            $this->middleware('guest:admin')->except('logout');
            $this->middleware('guest:seller')->except('logout');
            $this->middleware('guest:client')->except('logout');
        }

    public function sellerlogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('seller')->attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(["user"=>Auth::guard('seller')->user()], 200);
        }

        return  response()->json(['error' => 'Invalid credentials'],400);
    }
   
    public function clientlogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        
        if (Auth::guard('client')->attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(["user"=>Auth::guard('client')->user()], 200);
        }
        return  response()->json(['error' => 'Invalid credentials'],400);
    }

    public function logout(Request $request)
    {
            error_log(Auth::user());
            Auth::logout();

            $request->session()->invalidate();

            $request->session()->regenerateToken();

        return response()->json(['success' => TRUE],200);
    }

}
