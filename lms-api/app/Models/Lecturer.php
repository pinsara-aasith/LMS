<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'contact_no'
    ];

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
}
