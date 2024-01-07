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
        $students = Student::with(['user', 'department', 'faculty'])->get();
        return response()->json(['data' => $students]);
    }

    public function show(Student $student)
    {
        return response()->json(['data' => Student::with('user')->find($student->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string',
            'contact_no' => 'required|string',
            'nic_number' => 'required|string',
            'dob' => 'required|date',
            'country' => 'required|string',
            'city' => 'required|string',
            'admission_date' => 'required|date',
            'batch' => 'required|integer',
            'faculty_id' => 'required|integer',
            'department_id' => 'required|integer',
        ]);

      

        $student = new Student([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'contact_no' => $request->input('contact_no'),
            'nic_number' => $request->input('nic_number'),
            'dob' => $request->input('dob'),
            'country' => $request->input('country'),
            'city' => $request->input('city'),
            'admission_date' => $request->input('admission_date'),
            'batch' => $request->input('batch'),

            'faculty_id' => $request->input('faculty_id'),
            'department_id' => $request->input('department_id'),
        ]);

        $student->save();

        $fullName = $request->input('first_name') . " " . $request->input('last_name');
        $student->user()->create([
            'name' => $fullName,
            'email' => $request->input('email'),
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        return response()->json(['message' => 'Ok', 'data' => $student], 201);
    }

    public function update(Request $request, Student $student)
    {
        $request->validate([
            'name' => 'required|string',
            'contact_no' => 'required|string',
            'admission_date' => 'required|date',
            'batch' => 'required|integer',
        ]);

        $student->update([
            'contact_no' => $request->input('contact_no'),
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
