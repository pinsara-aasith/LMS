<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index()
    {
        return Faculty::all();
    }

    public function show(Request $faculty)
    {
        return $faculty;
    }

    public function store(Request $request)
    {
        $faculty = Faculty::create($request->all());
        return response()->json($faculty, 201);
    }
}
