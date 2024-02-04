<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'nic_number', 'dob', 'contact_no','country', 'city', 'admission_date','email', 'batch', 'faculty_id', 'department_id','time_table_link'];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

}
