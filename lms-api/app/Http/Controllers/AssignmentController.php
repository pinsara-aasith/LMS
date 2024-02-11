<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AssignmentController extends Controller
{
    public function index()
    {
        $assignments = Assignment::orderBy('id', 'DESC')->with('subject')->get();
        return response()->json(['data' => $assignments]);
    }

    public function show(Assignment $assignment)
    {
        return response()->json(['data' => Assignment::with('subject')->find($assignment->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'subject_id' => 'required',
        ]);

        $file_path = null;

        if($request->hasFile('file')) {
            $file = $request->file('file');
            $file_path = $file->store('assignments', 'public');    
        }

        $assignment = new Assignment([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'file_path' => $file_path,
            'subject_id' => $request->input('subject_id'),
        ]);

        $assignment->save();
        return response()->json(['message' => 'Ok', 'data' => $assignment], 201);
    }


    public function update(Request $request, Assignment $assignment)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'subject_id' => 'required',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('assignments', 'public');    
        }

        $assignment->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'file_path' => $filePath ??  $assignment->file_path,
            'subject_id' => $request->input('subject_id'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $assignment->with('subject')]);
    }

    public function destroy(Assignment $assignment)
    {
        $assignment->delete();

        return response()->json(['message' => 'Ok']);
    }

    public function indexSubmissions(Assignment $assignment)
    {
        $assignments = $assignment->submissions()->orderBy('id', 'DESC')->with('assignment')->with('assignmentSubmissionGrade')->with('student')->get();
        
        return response()->json(['data' => $assignments]);
    }

}
