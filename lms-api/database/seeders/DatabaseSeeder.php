<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Department;
use App\Models\Faculty;
use App\Models\Lecturer;
use App\Models\Subject;
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
            'name' => 'Faculty of Engineering',
            'description' => 'Faculty of Engineering: Nurturing innovation and excellence in engineering education, research, and application to prepare future leaders and problem solvers in the technological landscape.'
        ]);

        $faculty2 = Faculty::create([
            'name' => 'Faculty of Fashion Design',
            'description' => 'Fashion development encompasses the dynamic process of conceptualizing, designing, producing, and promoting clothing and accessories to meet the evolving trends and preferences of consumers. '
        ]);

        $faculty3 = Faculty::create([
            'name' => 'Faculty of Textiles',
            'description' => 'Pioneering innovation in textile engineering, weaving creativity with technical expertise for diverse applications'
        ]);

        $department = Department::create(['name' => 'Department of Computer Science Engineering', 'faculty_id' => $faculty->id]);

        Subject::create(['name' => 'Thermodynamics', 'code' => 1223, 'department_id' => $department->id]);
        Subject::create(['name' => 'Computer Hardware', 'code' => 1223, 'department_id' => $department->id]);
        Subject::create(['name' => 'Networking and Cybersecurity', 'code' => 1223, 'department_id' => $department->id]);

        Department::create(['name' => 'Department of Computer Science Engineering', 'faculty_id' => $faculty->id]);

        $lecturerCount = 5;
                // Creating lecturers with associated users
        Lecturer::factory($lecturerCount)->create(['contact_no' => '+94 78 632 23 98', 'faculty_id' => $faculty->id])->each(function ($lecturer) {
            $lecturer->user()->create([
                'name' => '',
                'email' => $lecturer->email,
                'password' => bcrypt('password'), // You can change the default password
                'role' => 'lecturer',
            ]);
        });
    }
}
