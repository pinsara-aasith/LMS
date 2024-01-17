<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Course;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Feedback;
use App\Models\Lecturer;
use App\Models\Notice;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
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

        $faculty2 = Faculty::create([
            'name' => 'Faculty of Fashion Design',
            'description' => 'Fashion development encompasses the dynamic process of conceptualizing, designing, producing, and promoting clothing and accessories to meet the evolving trends and preferences of consumers. '
        ]);

        $faculty3 = Faculty::create([
            'name' => 'Faculty of Textiles',
            'description' => 'Pioneering innovation in textile engineering, weaving creativity with technical expertise for diverse applications'
        ]);

        $department = Department::create(['name' => 'Department of Computer Science Engineering', 'faculty_id' => $faculty->id]);

        Course::create(['name' => 'Data Science And Engineering', 'code' => 1223, 'department_id' => $department->id]);
        Course::create(['name' => 'Computer Science Mainstream', 'code' => 1223, 'department_id' => $department->id]);
        Course::create(['name' => 'Networking and Cybersecurity', 'code' => 1223, 'department_id' => $department->id]);


        Notice::create(['title' => 'Upcoming Webinar on Emerging Technologies in Business', 'description' => 'Attention all users! Our Learning Management System will undergo scheduled maintenance on [date and time]. During this period, the system will be temporarily unavailable. We apologize for any inconvenience this may cause and appreciate your understanding. Please plan your activities accordingly, and we look forward to providing you with an improved learning experience after the maintenance is complete.']);
        Notice::create(['title' => 'Career Development Workshop - Enhance Your Job Search Skills', 'description' => 'Are you ready to take the next step in your career? Join us for a comprehensive workshop on job search strategies, resume building, and interview techniques. Our experienced career counselors will provide valuable insights and practical tips to help you navigate the job market successfully. Don\'t miss this chance to invest in your professional development and increase your chances of landing your dream job.']);
        Notice::create(['title' => 'System Maintenance - Temporary Downtime', 'description' => 'Attention all users! Our Learning Management System will undergo scheduled maintenance on [date and time]. During this period, the system will be temporarily unavailable. We apologize for any inconvenience this may cause and appreciate your understanding. Please plan your activities accordingly, and we look forward to providing you with an improved learning experience after the maintenance is complete.']);




        $lecturerCount = 2;
        $studentCount = 5;
        // Creating lecturers with associated users
        Lecturer::factory($lecturerCount)->create(['contact_no' => '+94 78 632 23 98', 'faculty_id' => $faculty->id])->each(function ($lecturer) {
            $lecturer->user()->create([
                'name' => '',
                'email' => $lecturer->email,
                'password' => bcrypt('password'), // You can change the default password
                'role' => 'lecturer',
            ]);
        });

        Student::factory($studentCount)->create(['contact_no' => '+94 78 632 23 98', 'faculty_id' => $faculty->id])->each(function ($student) {
            $student->user()->create([
                'name' => '',
                'email' => $student->email,
                'password' => bcrypt('password'), // You can change the default password
                'role' => 'student',
            ]);
        });


        Feedback::create([
            'type' =>  'harassment', 
            'description' => 'While the notice addresses various forms of harassment, it would be beneficial to include information on support resources available for those who experience harassment. This could enhance the overall effectiveness of the message.',
            'rating' => 3,
            'user_id' => 1,
        ]);

        Feedback::create([
            'type' =>  'academic', 
            'description' => 'Thank you for the timely notice regarding the extension of the course registration deadline. Clear communication like this is crucial for students to plan their schedules effectively. Much appreciated!',
            'rating' => 4,
            'user_id' => 3,
        ]);


        Feedback::create([
            'type' =>  'academic', 
            'description' => 'Academic notice on course registration extension is a lifesaver! Thanks for the timely update.',
            'rating' => 5,
            'user_id' => 3,
        ]);


        Feedback::create([
            'type' =>  'harassment', 
            'description' => 'Harassment awareness notice lacks depth. Needs more actionable steps and resources for victims.',
            'rating' => 1,
            'user_id' => 4,
        ]);
    }
}
