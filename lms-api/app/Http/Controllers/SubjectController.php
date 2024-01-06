<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::with('department')->get();
        return response()->json(['data' => $subjects]);
    }

    public function show(Subject $subject)
    {
        return response()->json(['data' => Subject::with('department')->find($subject->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'code' => 'required|string',
            'department_id' => 'required',
        ]);

        $subject = Subject::create([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'department_id' => $request->input('department_id'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $subject], 200);
    }

    public function update(Request $request, Subject $subject)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $subject->update([
            'name' => $request->input('name'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $subject->with('department')]);
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();

        return response()->json(['message' => 'Ok']);
    }
}
