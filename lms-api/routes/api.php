<?php

use App\Http\Controllers\FacultyController;
use App\Http\Controllers\LecturerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/faculties', [FacultyController::class, 'index']);
Route::get('/faculties/{faculty}', [FacultyController::class, 'show']);
Route::post('/faculties', [FacultyController::class, 'store']);
Route::put('/faculties/{faculty}', [FacultyController::class, 'update']);
Route::delete('/faculties/{faculty}', [FacultyController::class, 'destroy']);


Route::prefix('lecturers')->group(function () {
    Route::get('/', [LecturerController::class, 'index'])->name('lecturers.index');
    Route::get('/{lecturer}', [LecturerController::class, 'show'])->name('lecturers.show');
    Route::post('/', [LecturerController::class, 'store'])->name('lecturers.store');
    Route::put('/{lecturer}', [LecturerController::class, 'update'])->name('lecturers.update');
    Route::delete('/{lecturer}', [LecturerController::class, 'destroy'])->name('lecturers.destroy');
});

