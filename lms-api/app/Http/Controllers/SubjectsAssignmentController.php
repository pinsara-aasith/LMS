<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Student;
use App\Models\Subject;

class SubjectsAssignmentController extends Controller
{
    public function index(Subject $subject)
    {
        return response()->json(['data' => $subject->assignments]);
    }

    public function show(Assignment $assignment)
    {
        return response()->json(['data' => $assignment]);
    }
}
