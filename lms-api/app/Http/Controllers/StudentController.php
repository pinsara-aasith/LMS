<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::with('user')->get();
        return response()->json(['data' => $students]);
    }

    public function show(Student $student)
    {
        return response()->json(['data' => Student::with('user')->find($student->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users', // Assuming you have an 'email' field in your users table
            'password' => 'required|string|min:6',
            'phone_number' => 'required|string',
            'gender' => 'required|string',
            'admission_date' => 'required|date',
            'batch' => 'required|integer',
            'faculty_id' => 'required',
        ]);


        $student = Student::create([
            'phone_number' => $request->input('phone_number'),
            'gender' => $request->input('gender'),
            'admission_date' => $request->input('admission_date'),
            'batch' => $request->input('batch'),
            'faculty_id' => $request->input('faculty_id'),
        ]);

        $user = $student->user()->create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->password),
            'role' => 'student',
        ]);

        return response()->json(['message' => 'Ok', 'data' => $student], 201);
    }

    public function update(Request $request, Student $student)
    {
        $request->validate([
            'name' => 'required|string',
            'phone_number' => 'required|string',
            'gender' => 'required|string',
            'admission_date' => 'required|date',
            'batch' => 'required|integer',
        ]);

        $student->update([
            'phone_number' => $request->input('phone_number'),
            'gender' => $request->input('gender'),
            'admission_date' => $request->input('admission_date'),
            'batch' => $request->input('batch'),
        ]);

        $user = $student->user;
        $user->update([
            'name' => $request->input('name'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $student->with('user')]);
    }

    public function destroy(Student $student)
    {
        $student->user->delete();
        $student->delete();

        return response()->json(['message' => 'Ok']);
    }
}
