<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentSubmissionGrade extends Model
{
    use HasFactory;
    
    protected $fillable = ['grade', 'comment', 'assignment_submission_id', 'lecturer_id'];

    public function assignmentSubmission()
    {
        return $this->belongsTo(assignmentSubmission::class);
    }
}
