<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'email' => 'juan@expensemanager.com',
            'password' => bcrypt('password'),
            'role_id' => 'administrator',
        ]);
        DB::table('users')->insert([
            'first_name' => 'Leo',
            'last_name' => 'Ocampo',
            'email' => 'leo@expensemanager.com',
            'password' => bcrypt('password'),
            'role_id' => 'user',
        ]);
    }
}
