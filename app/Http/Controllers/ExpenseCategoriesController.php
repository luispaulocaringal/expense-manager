<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\ExpenseCategories;
use App\Models\User;

use Illuminate\Http\Request;

class ExpenseCategoriesController extends Controller
{
    public function addExpenseCategories(Request $request){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $expenseCategories = new ExpenseCategories;
            $expenseCategories->expenses_category_name = $request->expenses_category_name;
            $expenseCategories->expenses_category_description = $request->expenses_category_description;
            $expenseCategories->created_at = Carbon::Now()->toDateString();
            $expenseCategories->save();
            $response = [
                'success'=>true, 
                'data'=>[
                    'expenses_category_name'=> $expenseCategories->expenses_category_name,
                    'expenses_category_description'=> $expenseCategories->expenses_category_description,
                    'created_at'=> $expenseCategories->created_at
                ]
            ];
        }
        else if($user->role_id!="administrator"){
            $response = ['success'=>false, 'data'=>'You are not authorized to access this data'];
        }
        return $response;
    }

    public function getExpenseCategories(){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $expenseCategories = ExpenseCategories::all();
            $response = [
                'success' => true,
                'data' => $expenseCategories
            ];
        }
        else if($user->role_id!="administrator"){
            $response = ['success'=>false, 'data'=>'You are not authorized to access this data'];
        }
        return $response; 
    }

    public function updateExpenseCategories(Request $request){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $id = $request->input('expensecategoriesid');
            $expenseCategories = ExpenseCategories::findOrFail($id);
            $expenseCategories->expenses_category_name = $request->expenses_category_name;
            $expenseCategories->expenses_category_description = $request->expenses_category_description;
            $expenseCategories->save();
            $response = [
                'success'=>true, 
                'data'=>[
                    'expenses_category_name'=>$expenseCategories->id,
                    'expenses_category_description'=>$expenseCategories->code
                ]
            ];
           
        }
        else if($user->role_id!="administrator"){
            $response = ['success'=>false, 'data'=>'You are not authorized to access this data'];
        }
        return $response; 
    }

    public function deleteExpenseCategories(Request $request){
        $user = User::Auth();
        if($user->role_id=="administrator"){
            $id = $request->input('expensecategoriesid');
            $expenseCategories = ExpenseCategories::findOrFail($id);
            $expenseCategories->delete();
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
