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
        Schema::create('assignment_submission_grades', function (Blueprint $table) {
            $table->id();
            $table->integer('grade');
            $table->string('comment')->nullable();
            $table->foreignId('assignment_submission_id')->constrained()->onDelete('cascade');

            $table->foreignId('lecturer_id')->constrained();
            // Add other submission attributes as needed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignment_submission_grades');
    }
};
