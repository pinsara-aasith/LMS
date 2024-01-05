<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Faculty;
use App\Models\Lecturer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $faculty = Faculty::create([
            'name' => 'Facalty of Engineering',
            'description' => ''
        ]);

        $lecturerCount = 5;

        // Creating lecturers with associated users
        Lecturer::factory($lecturerCount)->create(['phone_number' => '+94 78 632 23 98', 'faculty_id' => $faculty->id])->each(function ($lecturer) {
            $lecturer->user()->create([
                'name' => '',
                'email' => 'lecturer' . $lecturer->id . '@example.com',
                'password' => bcrypt('password'), // You can change the default password
                'role' => 'lecturer',
            ]);
        });
    }
}
