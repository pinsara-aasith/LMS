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
        $students = Student::all();
        return response()->json(['data' => $students]);
    }

    public function show(Student $student)
    {
        return response()->json(['data' => $student->with('user')]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users', // Assuming you have an 'email' field in your users table
            'password' => 'required|string|min:6',
            'phone_number' => 'required|string',
        ]);

        $student = Student::create([
            'phone_number' => $request->input('phone_number'),
        ]);

        $user = $student->user()->create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->password),
            'role' => 'student',
        ]);

        $student = $user->userable()->create([
            'name' => $request->input('name'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $student], 201);
    }

    public function update(Request $request, Student $student)
    {
        $request->validate([
            'name' => 'required|string',
            'phone_number' => 'required|string',
        ]);

        $student->update([
            'phone_number' => $request->input('phone_number'),
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
