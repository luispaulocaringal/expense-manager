<?php

namespace App\Http\Controllers;

use DB;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use JWTAuth;
use JWTAuthException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

    private function getToken($email, $password)
    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>$token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }

    private function authenticate(Request $request)
    {
        $user = User::join('roles','roles.role_id','=','users.role_id')->where('email', $request->email)->get()->first();
        if ($user && \Hash::check($request->password, $user->password)){
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
        }else{
            $user = null;
        }

        return $user;
    }

    public function login(Request $request)
    {
        $user = self::authenticate($request);
        if(!$user){
            $response = ['success'=>false, 'data'=>'Incorrect email or password.'];
        }
        else if($user){
            $response = [
                'success'=>true, 
                'data'=>[
                    'id'=>$user->id,
                    'first_name'=>$user->first_name,
                    'last_name'=>$user->last_name,
                    'email'=>$user->email,
                    'role_id'=>$user->role_id,
                    'auth_token'=>$user->auth_token,
                    'user_preference'=>$user->user_preference
                ]
            ];   
        }  
    
        return response()->json($response, 201);
    }

    public function getUserProfile(Request $request)
    {
        $user = User::Auth();
        return $user;
    }

    public function addUsers(Request $request){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $users = new User;
            $users->first_name = $request->first_name;
            $users->last_name = $request->last_name;
            $users->email = $request->email;
            $users->role_id = $request->role_id;
            $users->password = bcrypt('password');
            $users->save();
            $response = [
                'success'=>true, 
                'data'=>[
                    'first_name'=> $users->first_name,
                    'last_name'=> $users->last_name,
                    'email'=> $users->entry_date,
                    'role_id'=> $users->role_id,
                ]
            ];
        }
        else if($user->role_id!="administrator"){
            $response = ['success'=>false, 'data'=>'You are not authorized to access this data'];
        }
        return $response;
    }

    public function getUsers(){
        $user = User::Auth();      
        if($user->role_id=="administrator"){
            $users = User::All();
            $response = [
                'success' => true,
                'data' => $users
            ];
        }
        else if($user->role_id!="administrator"){
            $response = ['success'=>false, 'data'=>'You are not authorized to access this data'];
        }
        return $response; 
    }

    public function updateUsers(Request $request){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $id = $request->input('usersid');
            $users = User::findOrFail($id);
            $users->first_name = $request->first_name;
            $users->last_name = $request->last_name;
            $users->email = $request->email;
            $users->role_id = $request->role_id;
            $users->save();
            $response = [
                'success'=>true, 
                'data'=>[
                    'first_name'=> $users->first_name,
                    'last_name'=> $users->last_name,
                    'email'=> $users->entry_date,
                    'role_id'=> $users->role_id,
                ]
            ];
        }
        else if($user->role_id!="administrator"){
            $response = ['success'=>false, 'data'=>'You are not authorized to access this data'];
        }
        return $response; 
    }

    public function deleteUsers(Request $request){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $id = $request->input('usersid');
            $users = User::findOrFail($id);
            $users->delete();
            $response = [
                'success'=>true, 
                'message'=>"The Category has been deleted"
            ];
        }
        else if($user->role_id!="administrator"){
            $response = ['success'=>false, 'data'=>'You are not authorized to access this data'];
        }
        return $response; 
    }

    public function changePassword(Request $request){
        $user = User::Auth();
        if(\Hash::check($request->current_password, $user->password)){
            $users = User::findOrFail($user->id);
            $users->password = bcrypt($request->new_password);
            $users->save();
            $response = [
                'success'=>true, 
                'message'=>"Password has been changed"
            ];
        }
        else{
            $response = [
                'success'=>false, 
                'message'=>"Current password is incorrect"
            ];
        }
        return $response; 
    }
}
