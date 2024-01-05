<?php

namespace Database\Factories;

use App\Models\Lecturer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lecturer>
 */
 class LecturerFactory extends Factory
 {
     protected $model = Lecturer::class;
 
     public function definition()
     {
         return [
             'phone_number' => $this->faker->phoneNumber,
             // Add other lecturer fields as needed
         ];
     }
 }