<?php

namespace App\Http\Controllers;

use DB;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Roles;

use Illuminate\Http\Request;

class RolesController extends Controller
{
    public function addRoles(Request $request){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $roles = new Roles;
            $roles->role_id = $request->role_id;
            $roles->role_desc = $request->role_desc;
            $roles->save();
            $response = [
                'success'=>true, 
                'data'=>[
                    'role_id'=> $roles->role_id,
                    'role_desc'=> $roles->role_desc,
                ]
            ];
        }
        else if($user->role_id!="administrator"){
            $response = ['success'=>false, 'data'=>'You are not authorized to access this data'];
        }
        return $response;
    }

    public function getRoles(){
        $user = User::Auth();
        $roles = Roles::all();
        $response = [
            'success' => true,
            'data' => $roles
        ];
        return $response; 
    }

    public function updateRoles(Request $request){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $id = $request->input('roleid');
            $roles = Roles::findOrFail($id);
            $roles->role_id = $request->role_id;
            $roles->role_desc = $request->role_desc;
            $roles->save();
            $response = [
                'success'=>true, 
                'data'=>[
                    'role_id'=>$roles->role_id,
                    'role_id'=>$roles->role_desc
                ]
            ];
        
        }
        else if($user->role_id!="administrator"){
            $response = ['success'=>false, 'data'=>'You are not authorized to access this data'];
        }
        return $response; 
    }

    public function deleteRoles(Request $request){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $id = $request->input('roleid');
            $roles = Roles::findOrFail($id);
            $roles->delete();
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
}
