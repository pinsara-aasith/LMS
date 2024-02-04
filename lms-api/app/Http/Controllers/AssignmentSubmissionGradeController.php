<?php

namespace App\Http\Controllers;

use App\Models\AssignmentSubmission;
use App\Models\AssignmentSubmissionGrade;
use App\Models\User;
use Illuminate\Http\Request;

class AssignmentSubmissionGradeController extends Controller
{

    public function store(Request $request, AssignmentSubmission $assignmentSubmission)
    {
        $request->validate([
            'grade' => 'required',
        ]);
        
        $user = User::find(auth()->user()->id);

        $assignmentSubmission->assignmentSubmissionGrade()->delete();

        $assignmentSubmissionGrade = AssignmentSubmissionGrade::create([
            'comment' => $request->input('text'),
            'grade' => $request->input('grade'),
            'assignment_submission_id' => $assignmentSubmission->id,
            'lecturer_id' => $user->userable->id,
        ]);

        return response()->json(['message' => 'Ok', 'data' => $assignmentSubmissionGrade], 200);
    }
}
