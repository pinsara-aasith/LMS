<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::with('user')->get();
        return response()->json(['data' => $feedbacks]);
    }

    public function store(Request $request)
    {
        $feedback = new Feedback([
            'description' => $request->input('description'),
            'rating' => $request->input('rating'),
            'type' => $request->input('type'),
            'user_id' => Auth::user()->id,
        ]);

        $feedback->save();

        return response()->json(['message' => 'Ok', 'data' => $feedback], 200);
    }

    public function show(Feedback $feedback)
    {
        return response()->json(['data' => Feedback::with('user')->find($feedback->id)]);
    }

    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return response()->json(['message' => 'Ok']);
    }
}
