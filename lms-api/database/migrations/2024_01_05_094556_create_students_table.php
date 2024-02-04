<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();

            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('contact_no')->nullable();
            $table->string('nic_number')->nullable();
            $table->date('dob')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->date('admission_date')->nullable();
            $table->integer('batch')->nullable();
            $table->foreignId('course_id')->nullable()->references('id')->on('courses');
            $table->foreignId('faculty_id')->nullable()->references('id')->on('faculties');
            $table->foreignId('department_id')->nullable()->references('id')->on('departments');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
