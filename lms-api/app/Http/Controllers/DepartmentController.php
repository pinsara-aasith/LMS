<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::with('faculty')->get();
        return response()->json(['data' => $departments]);
    }

    public function show(Department $department)
    {
        return response()->json(['data' => Department::with('faculty')->find($department->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'faculty_id' => 'required',
        ]);

        $department = Department::create([
            'name' => $request->input('name'),
            'faculty_id' => $request->input('faculty_id'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $department], 201);
    }

    public function update(Request $request, Department $department)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $department->update([
            'name' => $request->input('name'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $department->with('faculty')]);
    }

    public function destroy(Department $department)
    {
        $department->delete();

        return response()->json(['message' => 'Ok']);
    }
}
