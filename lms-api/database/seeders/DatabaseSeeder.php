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

        $course1 = Course::create(['name' => 'Data Science And Engineering', 'code' => 1223, 'department_id' => $department->id]);
        $course2 = Course::create(['name' => 'Computer Science Mainstream', 'code' => 1223, 'department_id' => $department->id]);
        $course3 = Course::create(['name' => 'Networking and Cybersecurity', 'code' => 1223, 'department_id' => $department->id]);

        $subjects = [
            // Course 1 - Data Science And Engineering
            ['name' => 'Data Science Fundamentals', 'code' => 'DSF101', 'course_id' => $course1->id],
            ['name' => 'Statistical Analysis for Data Science', 'code' => 'SADS201', 'course_id' => $course1->id],
            ['name' => 'Advanced Machine Learning', 'code' => 'AML301', 'course_id' => $course1->id],
            ['name' => 'Data Warehousing and Mining', 'code' => 'DWM401', 'course_id' => $course1->id],
            ['name' => 'Natural Language Processing', 'code' => 'NLP501', 'course_id' => $course1->id],
            ['name' => 'Big Data Architecture', 'code' => 'BDA601', 'course_id' => $course1->id],

            // Course 2 - Computer Science Mainstream
            ['name' => 'Algorithmic Design', 'code' => 'AD101', 'course_id' => $course2->id],
            ['name' => 'Software Development Practices', 'code' => 'SDP201', 'course_id' => $course2->id],
            ['name' => 'Operating Systems Concepts', 'code' => 'OS301', 'course_id' => $course2->id],
            ['name' => 'Database Systems Design', 'code' => 'DSD401', 'course_id' => $course2->id],
            ['name' => 'Web Development Technologies', 'code' => 'WDT501', 'course_id' => $course2->id],
            ['name' => 'Artificial Intelligence Basics', 'code' => 'AIB601', 'course_id' => $course2->id],

            // Course 3 - Networking and Cybersecurity
            ['name' => 'Network Protocols and Security', 'code' => 'NPS101', 'course_id' => $course3->id],
            ['name' => 'Cybersecurity Fundamentals', 'code' => 'CF201', 'course_id' => $course3->id],
            ['name' => 'Firewall Configuration and Management', 'code' => 'FCM301', 'course_id' => $course3->id],
            ['name' => 'Intrusion Detection and Prevention', 'code' => 'IDP401', 'course_id' => $course3->id],
            ['name' => 'Wireless Network Security', 'code' => 'WNS501', 'course_id' => $course3->id],
            ['name' => 'Penetration Testing Techniques', 'code' => 'PTT601', 'course_id' => $course3->id],
        ];

        Subject::insert($subjects);

        $assignments = [
            // Data Science Fundamentals
            ['title' => 'Introduction to Data Science', 'description' => 'Write an essay on the importance and applications of data science.', 'file_path' => '/assignment_files/intro_data_science.pdf', 'subject_id' => 1],
            ['title' => 'Exploratory Data Analysis', 'description' => 'Perform exploratory data analysis on a given dataset and submit your findings.', 'file_path' => '/assignment_files/exploratory_data_analysis.docx', 'subject_id' => 1],
            ['title' => 'Statistical Analysis Project', 'description' => 'Conduct a statistical analysis project using real-world data.', 'file_path' => '/assignment_files/statistical_analysis_project.zip', 'subject_id' => 1],
            ['title' => 'Data Science Project Proposal', 'description' => 'Submit a proposal for your data science project, including objectives and methodologies.', 'file_path' => '/assignment_files/project_proposal.doc', 'subject_id' => 1],
            ['title' => 'Advanced Data Visualization', 'description' => 'Create an advanced data visualization project using appropriate tools and techniques.', 'file_path' => '/assignment_files/advanced_data_visualization.pptx', 'subject_id' => 1],
            ['title' => 'Machine Learning Application', 'description' => 'Apply machine learning algorithms to solve a real-world problem and document your approach.', 'file_path' => '/assignment_files/machine_learning_application.py', 'subject_id' => 1],
            ['title' => 'Natural Language Processing Challenge', 'description' => 'Participate in a natural language processing challenge and submit your solution.', 'subject_id' => 1, 'file_path' => null],
            ['title' => 'Data Science in Healthcare', 'description' => 'Explore the application of data science in healthcare and present your findings.', 'subject_id' => 1, 'file_path' => null],

            // Big Data Architecture
            ['title' => 'Big Data Case Study', 'description' => 'Analyze a real-world case study involving big data and propose solutions.', 'subject_id' => 2, 'file_path' => null],
            ['title' => 'Big Data Infrastructure Design', 'description' => 'Design the infrastructure for a big data system based on specified requirements.', 'subject_id' => 2, 'file_path' => null],

            // Additional assignments
            ['title' => 'Data Science Project Proposal', 'description' => 'Submit a proposal for your data science project, including objectives and methodologies.', 'subject_id' => 7, 'file_path' => null],
            ['title' => 'Advanced Big Data Analytics', 'description' => 'Explore advanced techniques in big data analytics and submit a report.', 'subject_id' => 7, 'file_path' => null],
            ['title' => 'Data Science Ethics and Privacy', 'description' => 'Write an essay on the ethical considerations in data science and data privacy issues.', 'subject_id' => 7, 'file_path' => null],
            ['title' => 'Overview of Big Data Technologies', 'description' => 'Research and present an overview of various big data technologies.', 'subject_id' => 7, 'file_path' => null],
        ];

        Assignment::insert($assignments);

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


        $lecturerCount = 2;
        $studentCount = 5;

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

        // Creating lecturers with associated users
        Lecturer::factory($lecturerCount)->create(['contact_no' => '+94 78 632 23 98', 'faculty_id' => $faculty->id])->each(function ($lecturer) {
            $lecturer->user()->create([
                'name' => $lecturer->first_name . '_' . $lecturer->first_name,
                'user_name' => $lecturer->first_name . "_" . $lecturer->last_name,
                'email' => $lecturer->email,
                'password' => bcrypt('password'), // You can change the default password
                'role' => 'lecturer',
            ]);
        });

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

        Student::factory($studentCount)->create(['contact_no' => '+94 78 632 23 98', 'faculty_id' => $faculty->id, 'course_id' => 1])->each(function ($student) {
            $student->user()->create([
                'name' => $student->first_name . " " . $student->last_name,
                'email' => $student->email,
                'user_name' => $student->first_name . "_" . $student->last_name,
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
            'type' =>  'financial',
            'description' => 'This is a dummy financial feedback',
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
            'type' =>  'administration',
            'description' => 'If you prefer not to use a controller and define the logic directly in the routes file, you can do so in the web.php file. Here\'s an example of how you can create a route without using a controller to return the count of admin users!',
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
