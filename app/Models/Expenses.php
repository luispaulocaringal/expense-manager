<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    use HasFactory;
    protected $table = 'expenses';

    protected $fillable = [
        'expense_category_id',
        'amount',
        'entry_date',
        'chart_color',
        'created_at'
    ];
}
