<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AssignmentSubmissionController;
use App\Http\Controllers\AssignmentSubmissionGradeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\LecturerController;
use App\Http\Controllers\MySubjectController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SubjectsAssignmentController;
use App\Models\Admin;
use App\Models\Course;
use App\Models\Department;
use App\Models\Faculty;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/faculties', [FacultyController::class, 'index']);
Route::get('/faculties/{faculty}', [FacultyController::class, 'show']);
Route::post('/faculties', [FacultyController::class, 'store']);
Route::put('/faculties/{faculty}', [FacultyController::class, 'update']);
Route::delete('/faculties/{faculty}', [FacultyController::class, 'destroy']);


Route::prefix('lecturers')->group(function () {
    Route::get('/', [LecturerController::class, 'index'])->name('lecturers.index');
    Route::get('/{lecturer}', [LecturerController::class, 'show'])->name('lecturers.show');
    Route::post('/', [LecturerController::class, 'store'])->name('lecturers.store');
    Route::post('/{lecturer}/edit', [LecturerController::class, 'update'])->name('lecturers.update');
    Route::delete('/{lecturer}', [LecturerController::class, 'destroy'])->name('lecturers.destroy');
});

Route::prefix('students')->group(function () {
    Route::get('/', [StudentController::class, 'index'])->name('students.index');
    Route::get('/{student}', [StudentController::class, 'show'])->name('students.show');
    Route::post('/', [StudentController::class, 'store'])->name('students.store');
    Route::put('/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
});

Route::prefix('admins')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admins.index');
    Route::get('/{admin}', [AdminController::class, 'show'])->name('admins.show');
    Route::post('/', [AdminController::class, 'store'])->name('admins.store');
    Route::put('/{admin}', [AdminController::class, 'update'])->name('admins.update');
    Route::delete('/{admin}', [AdminController::class, 'destroy'])->name('admins.destroy');
});

Route::prefix('departments')->group(function () {
    Route::get('/', [DepartmentController::class, 'index'])->name('departments.index');
    Route::get('/{department}', [DepartmentController::class, 'show'])->name('departments.show');
    Route::post('/', [DepartmentController::class, 'store'])->name('departments.store');
    Route::put('/{department}', [DepartmentController::class, 'update'])->name('departments.update');
    Route::delete('/{department}', [DepartmentController::class, 'destroy'])->name('departments.destroy');
});

Route::prefix('subjects')->group(function () {
    Route::get('/', [SubjectController::class, 'index'])->name('subjects.index');
    Route::get('/{subject}', [SubjectController::class, 'show'])->name('subjects.show');
    Route::post('/', [SubjectController::class, 'store'])->name('subjects.store');
    Route::put('/{subject}', [SubjectController::class, 'update'])->name('subjects.update');
    Route::delete('/{subject}', [SubjectController::class, 'destroy'])->name('subjects.destroy');
});

Route::prefix('subjects/{subject}')->group(function () {
    Route::get('/assignments', [SubjectsAssignmentController::class, 'index'])->name('subjects.index');
});

Route::prefix('courses')->group(function () {
    Route::get('/', [CourseController::class, 'index'])->name('courses.index');
    Route::get('/{course}', [CourseController::class, 'show'])->name('courses.show');
    Route::post('/', [CourseController::class, 'store'])->name('courses.store');
    Route::post('/{course}/edit', [CourseController::class, 'update'])->name('courses.update');
    Route::delete('/{course}', [CourseController::class, 'destroy'])->name('courses.destroy');
});

Route::prefix('notices')->group(function () {
    Route::get('/', [NoticeController::class, 'index'])->name('notices.index');
    Route::get('/{notice}', [NoticeController::class, 'show'])->name('notices.show');
    Route::post('/', [NoticeController::class, 'store'])->name('notices.store');
    Route::put('/{notice}', [NoticeController::class, 'update'])->name('notices.update');
    Route::delete('/{notice}', [NoticeController::class, 'destroy'])->name('notices.destroy');
});

Route::middleware(['auth:sanctum'])->prefix('assignments')->group(function () {
    Route::get('/', [AssignmentController::class, 'index'])->name('assignments.index');
    Route::get('/{assignment}', [AssignmentController::class, 'show'])->name('assignments.show');
    Route::post('/', [AssignmentController::class, 'store'])->name('assignments.store');
    Route::put('/{assignment}', [AssignmentController::class, 'update'])->name('assignments.update');
    Route::delete('/{assignment}', [AssignmentController::class, 'destroy'])->name('assignments.destroy');

    Route::get('/{assignment}/submissions/', [AssignmentController::class, 'indexSubmissions'])->name('assignmentSubmissions.showAll');
    Route::post('/{assignment}/submissions/', [AssignmentSubmissionController::class, 'store'])->name('assignmentSubmissions.store');
});


Route::middleware(['auth:sanctum'])->prefix('assignmentSubmissions')->group(function () {
    Route::get('/', [AssignmentSubmissionController::class, 'index'])->name('assignmentSubmissions.index');
    Route::get('/{assignmentSubmission}', [AssignmentSubmissionController::class, 'show'])->name('assignments.show');

    Route::post('/{assignmentSubmission}/grade', [AssignmentSubmissionGradeController::class, 'store'])->name('assignmentsSubmissionGrade.store');
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/totalAdmins',  function (Request $request) {
        return response()->json(['data' => Admin::count()]);
    })->name('totalAdmins.show');

    Route::get('/totalFaculties',  function (Request $request) {
        return response()->json(['data' => Faculty::count()]);
    })->name('totalFaculties.show');

    Route::get('/totalCourses',  function (Request $request) {
        return response()->json(['data' => Course::count()]);
    })->name('totalCourses.show');

    Route::get('/totalDepartments',  function (Request $request) {
        return response()->json(['data' => Department::count()]);
    })->name('totalCourses.show');
});


Route::prefix('feedbacks')->group(function () {
    Route::get('/', [FeedbackController::class, 'index'])->name('feedbacks.index');
    Route::get('/{feedback}', [FeedbackController::class, 'show'])->name('feedbacks.show');
    Route::middleware(['auth:sanctum'])->post('/', [FeedbackController::class, 'store'])->name('feedbacks.store');
});

Route::middleware(['auth:sanctum'])->get('/me/subjects', [MySubjectController::class, 'index'])->name('mysubjects.index');
