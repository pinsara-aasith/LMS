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
        $subjects = Subject::with('course')->get();
        return response()->json(['data' => $subjects]);
    }

    public function show(Subject $subject)
    {
        return response()->json(['data' => Subject::with('course')->find($subject->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'code' => 'required|string',
            'course_id' => 'required',
        ]);

        $subject = Subject::create([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'course_id' => $request->input('course_id'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $subject], 200);
    }

    public function update(Request $request, Subject $subject)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $subject->update([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $subject->with('course')]);
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();

        return response()->json(['message' => 'Ok']);
    }
}
