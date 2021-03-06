<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt.auth','api-header']], function () {
    Route::get('/user/profile', 'UserController@getUserProfile');
    Route::post('/user/addUsers', 'UserController@addUsers');
    Route::get('/user/getUsers', 'UserController@getUsers');
    Route::put('/user/updateUsers', 'UserController@updateUsers');
    Route::delete('/user/deleteUsers', 'UserController@deleteUsers');
    Route::post('/user/changePassword', 'UserController@changePassword');
    Route::post('/request/addexpensecategories', 'ExpenseCategoriesController@addExpenseCategories');
    Route::get('/request/getExpenseCategories', 'ExpenseCategoriesController@getExpenseCategories');
    Route::put('/request/updateExpenseCategories', 'ExpenseCategoriesController@updateExpenseCategories');
    Route::delete('/request/deleteExpenseCategories', 'ExpenseCategoriesController@deleteExpenseCategories');
    Route::post('/request/addExpenses', 'ExpensesController@addExpenses');
    Route::get('/request/getExpenses', 'ExpensesController@getExpenses');
    Route::put('/request/updateExpenses', 'ExpensesController@updateExpenses');
    Route::delete('/request/deleteExpenses', 'ExpensesController@deleteExpenses');
    Route::post('/request/addRoles', 'RolesController@addRoles');
    Route::get('/request/getRoles', 'RolesController@getRoles');
    Route::put('/request/updateRoles', 'RolesController@updateRoles');
    Route::delete('/request/deleteRoles', 'RolesController@deleteRoles');
});

Route::group(['middleware' => 'api-header'], function () {
    Route::post('/user/login', 'UserController@login');
});