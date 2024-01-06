<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index()
    {
        return [
            'data' => Faculty::all(),
            'message' => 'Ok'
        ];
    }

    public function show(Faculty $faculty)
    {
        return response()->json(['data' => $faculty]);
    }

    public function update(Request $request, Faculty $faculty)
    {
        $faculty->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $faculty]);
    }

    public function store(Request $request)
    {
        $faculty = Faculty::create($request->all());
        return response()->json($faculty, 201);
    }

    public function destroy(Faculty $faculty)
    {
        $faculty->delete();

        return response()->json(['message' => 'Ok']);
    }
}
