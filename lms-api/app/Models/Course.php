<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'department_id', 'code'];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}
