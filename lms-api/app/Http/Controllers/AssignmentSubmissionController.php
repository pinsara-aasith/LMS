<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AssignmentSubmissionController extends Controller
{
    public function index()
    {
        $assignments = AssignmentSubmission::orderBy('id', 'DESC')->with('assignment')->with('assignmentSubmissionGrade')->get();
        return response()->json(['data' => $assignments]);
    }

    public function show(AssignmentSubmission $assignmentSubmission)
    {
        return response()->json(['data' => AssignmentSubmission::with('assignment')->with('assignmentSubmissionGrade')->find($assignmentSubmission->id)]);
    }


    public function store(Request $request, Assignment $assignment)
    {
        $request->validate([
            'text' => 'required',
        ]);
        
        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('assignment_files');
        }

        $user = User::find(auth()->user()->id);

        $assignmentSubmission = AssignmentSubmission::create([
            'text' => $request->input('text'),
            'file_path' => $filePath,
            'assignment_id' => $assignment->id,
            'student_id' => $user->userable->id,
        ]);

        return response()->json(['message' => 'Ok', 'data' => $assignmentSubmission], 200);
    }
}
