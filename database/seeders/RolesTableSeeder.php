<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'role_id' => 'administrator',
            'role_name' => 'Administrator',
            'role_desc' => 'super user',
        ]);
        DB::table('roles')->insert([
            'role_id' => 'user',
            'role_name' => 'User',
            'role_desc' => 'can add expense',
        ]);
    }
}
