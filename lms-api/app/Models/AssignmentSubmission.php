<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentSubmission extends Model
{
    use HasFactory;
    
    protected $fillable = ['text', 'file_path', 'assignment_id', 'student_id'];

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }

    public function assignmentSubmissionGrade()
    {
        return $this->hasOne(AssignmentSubmissionGrade::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
