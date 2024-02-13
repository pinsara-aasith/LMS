<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Feedback;
use App\Models\Lecturer;
use App\Models\Notice;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class FreshSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        $faculty = Faculty::create([
            'name' => 'Faculty of Engineering',
            'description' => 'Faculty of Engineering: Nurturing innovation and excellence in engineering education, research, and application to prepare future leaders and problem solvers in the technological landscape.'
        ]);

        $department = Department::create(['name' => 'Department of Computer Science Engineering', 'faculty_id' => $faculty->id]);

        $course1 = Course::create(['name' => 'Data Science And Engineering', 'code' => 1223, 'department_id' => $department->id]);
       
        Notice::create(['title' => 'Upcoming Webinar on Emerging Technologies in Business', 'description' => 'Attention all users! Our Learning Management System will undergo scheduled maintenance on [date and time]. During this period, the system will be temporarily unavailable. We apologize for any inconvenience this may cause and appreciate your understanding. Please plan your activities accordingly, and we look forward to providing you with an improved learning experience after the maintenance is complete.']);
        Notice::create(['title' => 'Career Development Workshop - Enhance Your Job Search Skills', 'description' => 'Are you ready to take the next step in your career? Join us for a comprehensive workshop on job search strategies, resume building, and interview techniques. Our experienced career counselors will provide valuable insights and practical tips to help you navigate the job market successfully. Don\'t miss this chance to invest in your professional development and increase your chances of landing your dream job.']);
        Notice::create(['title' => 'System Maintenance - Temporary Downtime', 'description' => 'Attention all users! Our Learning Management System will undergo scheduled maintenance on [date and time]. During this period, the system will be temporarily unavailable. We apologize for any inconvenience this may cause and appreciate your understanding. Please plan your activities accordingly, and we look forward to providing you with an improved learning experience after the maintenance is complete.']);

        $admin = Admin::create([]);
        $admin->user()->create([
            'name' => 'Amsith',
            'email' => 'amsith@gmail.com',
            'user_name' => 'amsith',
            'password' => bcrypt('password'), // You can change the default password
            'role' => 'admin',
        ]);


        $lecturer1 = Lecturer::create([
            'first_name' => 'Kodithuwakku',
            'last_name' => 'Rathmalanage',
            'batch' => 2024,
            'email' => 'lecturer@gmail.com',
            'contact_no' => '+94 78 632 23 98',
            'faculty_id' => 1,
        ]);
        $lecturer1->user()->create(
            [
                'name' => $lecturer1->first_name . " " . $lecturer1->last_name,
                'email' => $lecturer1->email,
                'user_name' => 'lecturer',
                'password' => bcrypt('password'), // You can change the default password
                'role' => 'lecturer'
            ]
        );

        $student1 = Student::create([
            'first_name' => 'Pinsara',
            'last_name' => 'Aasith',
            'batch' => 2023,
            'email' => 'student@gmail.com',
            'contact_no' => '+94 78 632 23 98',
            'faculty_id' => 1,
            'course_id' => 1,
        ]);

        $student1->user()->create(
            [
                'name' => $student1->first_name . " " . $student1->last_name,
                'email' => $student1->email,
                'password' => bcrypt('password'), // You can change the default password
                'role' => 'student',
                'user_name' => 'student',
            ]
        );

    }
}
