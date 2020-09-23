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
    Route::post('/request/addexpensecategories', 'ExpenseCategoriesController@addExpenseCategories');
    Route::get('/request/getExpenseCategories', 'ExpenseCategoriesController@getExpenseCategories');
    Route::put('/request/updateExpenseCategories', 'ExpenseCategoriesController@updateExpenseCategories');
    Route::delete('/request/deleteExpenseCategories', 'ExpenseCategoriesController@deleteExpenseCategories');
});

Route::group(['middleware' => 'api-header'], function () {
    Route::post('/user/login', 'UserController@login');
});