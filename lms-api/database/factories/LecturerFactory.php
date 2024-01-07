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
            'contact_no' => $this->faker->phoneNumber,
            'first_name' => $this->faker->name(),
            'last_name' => $this->faker->name,
            'batch' => 2023,
            'email' => $this->faker->email,
             // Add other lecturer fields as needed
         ];
     }
 }