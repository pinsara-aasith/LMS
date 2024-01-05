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
        $lecturers = Lecturer::all();
        return response()->json(['data' => $lecturers]);
    }

    public function show(Lecturer $lecturer)
    {
        return response()->json(['data' => $lecturer->with('user')]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users', // Assuming you have an 'email' field in your users table
            'password' => 'required|string|min:6',
            'phone_number' => 'required|string',
        ]);

        $lecturer = Lecturer::create([
            'phone_number' => $request->input('phone_number'),
            'faculty_id' => $request->input('faculty_id'),
        ]);

        $user = $lecturer->user()->create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->password),
            'role' => 'lecturer',
        ]);

        $lecturer = $user->userable()->create([
            'name' => $request->input('name'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $lecturer], 201);
    }

    public function update(Request $request, Lecturer $lecturer)
    {
        $request->validate([
            'name' => 'required|string',
            'phone_number' => 'required|string',
        ]);

        $lecturer->update([
            'phone_number' => $request->input('phone_number'),
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
