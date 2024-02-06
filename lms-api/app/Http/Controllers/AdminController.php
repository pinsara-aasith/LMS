<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index()
    {
        $admins = Admin::orderBy('id', 'DESC')->with('user')->get();
        return response()->json(['data' => $admins]);
    }

    public function show(Admin $admin)
    {
        return response()->json(['data' => Admin::with('user')->find($admin->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'user_name' => 'required|string',
            'email' => 'required|email|unique:users', // Assuming you have an 'email' field in your users table
            'password' => 'required|string|min:6',
        ]);

        $admin = Admin::create();

        $user = $admin->user()->create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'user_name' => $request->input('user_name'),
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return response()->json(['message' => 'Ok', 'data' => $admin], 201);
    }

    public function update(Request $request, Admin $admin)
    {
        $request->validate([
            'name' => 'required|string',
            'user_name' => 'required|string',
            'email' => 'required|email:users', // Assuming you have an 'email' field in your users table
            'password' => 'required|string|min:6',
        ]);

        $user = $admin->user;
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'user_name' => $request->input('user_name'),
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return response()->json(['message' => 'Ok', 'data' => $admin->with('user')]);
    }

    public function destroy(Admin $admin)
    {
        $admin->user->delete();
        $admin->delete();

        return response()->json(['message' => 'Ok']);
    }
}
