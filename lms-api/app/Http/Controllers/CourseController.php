<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with('department')->get();
        return response()->json(['data' => $courses]);
    }

    public function show(Course $course)
    {
        return response()->json(['data' => Course::with('department')->find($course->id)]);
    }

    public function store(Request $request)
    {
        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('timetable_links');
        }

        $request->validate([
            'name' => 'required|string',
            'code' => 'required|string',
            'department_id' => 'required',
        ]);

        $course = Course::create([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'department_id' => $request->input('department_id'),
            'time_table_link' => $filePath
        ]);

        return response()->json(['message' => 'Ok', 'data' => $course], 200);
    }

    public function update(Request $request, Course $course)
    {
        $request->validate([
            'name' => 'required|string',
            'code' => 'required|string',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('timetable_links');
        }

        $course->update([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'time_table_link' => $filePath
        ]);

        return response()->json(['message' => 'Ok', 'data' => $course->with('department')]);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json(['message' => 'Ok']);
    }
}
