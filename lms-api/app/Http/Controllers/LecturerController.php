<?php

namespace App\Http\Controllers;

use App\Models\Lecturer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LecturerController extends Controller
{
    public function index()
    {
        $lecturers = Lecturer::orderBy('id', 'DESC')->with(['user', 'faculty'])->get();
        return response()->json(['data' => $lecturers]);
    }

    public function show(Lecturer $lecturer)
    {
        return response()->json(['data' => Lecturer::with('user')->find($lecturer->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string',
            'contact_no' => 'required|string',
            'user_name' => 'required|string',
            'nic_number' => 'required|string',
            'password' => 'required|string',
            'dob' => 'required|date',
            'faculty_id' => 'required|integer',
        ]);

      
        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('timetable_links');
        }


        $lecturer = new Lecturer([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'contact_no' => $request->input('contact_no'),
            'nic_number' => $request->input('nic_number'),
            'dob' => $request->input('dob'),

            'faculty_id' => $request->input('faculty_id'),
            'time_table_link' => $filePath
        ]);

        $lecturer->save();

        $fullName = $request->input('first_name') . " " . $request->input('last_name');
        $lecturer->user()->create([
            'name' => $fullName,
            'email' => $request->input('email'),
            'user_name' => $request->input('user_name'),
            'password' => Hash::make($request->input('password')),
            'role' => 'lecturer',
        ]);

        return response()->json(['message' => 'Ok', 'data' => $lecturer], 201);
    }

    public function update(Request $request, Lecturer $lecturer)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string',
            'contact_no' => 'required|string',
            'user_name' => 'required|string',
            'nic_number' => 'required|string',
            'password' => 'required|string',
            'dob' => 'required|date',
            'faculty_id' => 'required|integer',
        ]);


        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('timetable_links');
        }


        $lecturer->update([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'contact_no' =>$request->input('contact_no'),
            'nic_number' => $request->input('nic_number'),
            'dob' => $request->input('dob'),
            'faculty_id' => $request->input('faculty_id'),
            'department_id' => $request->input('department_id'),


            'contact_no' => $request->input('contact_no'),
            'admission_date' => $request->input('admission_date'),
            'batch' => $request->input('batch'),

            'time_table_link' => $filePath ?? $lecturer->time_table_link
        ]);

        $user = $lecturer->user;
        $fullName = $request->input('first_name') . " " . $request->input('last_name');
        $user->update([
            'name' => $fullName,
            'email' => $request->input('email'),
            'user_name' => $request->input('user_name'),
            'password' => Hash::make($request->input('password')),
            'role' => 'lecturer',
        ]);

        return response()->json(['message' => 'Ok', 'data' => $lecturer->with('user')]);
    }

    public function destroy(Lecturer $lecturer)
    {
        $lecturer->user->delete();
        $lecturer->delete();

        return response()->json(['message' => 'Ok']);
    }
}
