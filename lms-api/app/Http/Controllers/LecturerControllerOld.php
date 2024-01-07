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
        $lecturers = Lecturer::with('user')->get();
        return response()->json(['data' => $lecturers]);
    }

    public function show(Lecturer $lecturer)
    {
        return response()->json(['data' => Lecturer::with('user')->find($lecturer->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users', // Assuming you have an 'email' field in your users table
            'password' => 'required|string|min:6',
            'contact_no' => 'required|string',
            'faculty_id' => 'required',
        ]);

        $lecturer = Lecturer::create([
            'contact_no' => $request->input('contact_no'),
            'faculty_id' => $request->input('faculty_id'),
        ]);

        $user = $lecturer->user()->create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->password),
            'role' => 'lecturer',
        ]);

        return response()->json(['message' => 'Ok', 'data' => $lecturer], 201);
    }

    public function update(Request $request, Lecturer $lecturer)
    {
        $request->validate([
            'name' => 'required|string',
            'contact_no' => 'required|string',
        ]);

        $lecturer->update([
            'contact_no' => $request->input('contact_no'),
        ]);

        $user = $lecturer->user;
        $user->update([
            'name' => $request->input('name'),
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
