<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class MySubjectController extends Controller
{
    public function index()
    {
        $user = User::find(auth()->user()->id);

        Log::info($user->userable);

        if ($user->role == 'admin') {
            $subjects = Subject::orderBy('id', 'DESC')->with('course')->get();
            return response()->json(['data' => $subjects]);
        }

        if ($user->role == 'student') {
            $student = $user->userable;

            if(!$student->course) {
                throw new Exception("The student hasn't subscribed to any course");
            }
            
            $subjects = $student->course->subjects()->with('course')->get();
            return response()->json(['data' => $subjects]);
        }

        if ($user->role == 'lecturer') {
            $subjects = Subject::orderBy('id', 'DESC')->with('course')->get();
            return response()->json(['data' => $subjects]);
        }

        $subjects = Subject::orderBy('id', 'DESC')->with('course')->with('course')->get();
        return response()->json(['data' => $subjects]);
    }
}
