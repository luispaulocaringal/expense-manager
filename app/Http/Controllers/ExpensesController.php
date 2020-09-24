<?php

namespace App\Http\Controllers;

use DB;
use Carbon\Carbon;
use App\Models\Expenses;
use App\Models\ExpensesCategories;
use App\Models\User;

use Illuminate\Http\Request;

class ExpensesController extends Controller
{
    public function addExpenses(Request $request){
        $user = User::Auth();
        $expenses = new Expenses;
        $expenses->user_id = $user->id;
        $expenses->expenses_category_id = $request->expenses_category_id;
        $expenses->amount = $request->amount;
        $expenses->entry_date = $request->entry_date;
        $expenses->chart_color = $request->chart_color;
        $expenses->created_at = Carbon::Now()->toDateString();
        $expenses->save();
        $response = [
            'success'=>true, 
            'data'=>[
                'expenses_category_id'=> $expenses->expenses_category_id,
                'amount'=> $expenses->amount,
                'entry_date'=> $expenses->entry_date
            ]
        ];
        return $response;
    }

    public function getExpenses(){
        $user = User::Auth();
        $expenses = Expenses::join('expense_categories', 'expenses.expenses_category_id','=','expense_categories.id')
            ->join('users','users.id','=','expenses.user_id')
            ->select('expense_categories.expenses_category_name','expenses.amount','expenses.entry_date','expenses.created_at','expenses.expenses_category_id','expenses.chart_color')
            ->where('expenses.user_id',$user->id)
            ->get();
        $response = [
            'success' => true,
            'data' => $expenses
        ];
        return $response; 
    }

    public function updateExpenses(Request $request){
        $user = User::Auth();
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
        return $response; 
    }

    public function deleteExpenses(Request $request){
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
