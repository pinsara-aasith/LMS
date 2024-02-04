<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class NoticeController extends Controller
{
    public function index()
    {
        $notices = Notice::orderBy('id', 'DESC')->get();
        return response()->json(['data' => $notices]);
    }

    public function show(Notice $notice)
    {
        return response()->json(['data' => Notice::find($notice->id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $notice = Notice::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $notice], 200);
    }

    public function update(Request $request, Notice $notice)
    {
        $request->validate([
            'title' => 'required|string',
        ]);

        $notice->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return response()->json(['message' => 'Ok', 'data' => $notice]);
    }

    public function destroy(Notice $notice)
    {
        $notice->delete();

        return response()->json(['message' => 'Ok']);
    }
}
