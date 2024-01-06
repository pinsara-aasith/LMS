<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::with('faculty')->get();
        return response()->json(['data' => $subjects]);
    }

    public function show(Subject $subject)
    {
        return response()->json(['data' => Subject::with('faculty')->find($subject->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'faculty_id' => 'required',
        ]);

        $subject = Subject::create([
            'name' => $request->input('name'),
            'faculty_id' => $request->input('faculty_id'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $subject], 201);
    }

    public function update(Request $request, Subject $subject)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $subject->update([
            'name' => $request->input('name'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $subject->with('faculty')]);
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();

        return response()->json(['message' => 'Ok']);
    }
}
