<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->boolean('confidential')->default(false);
            $table->string('department')->nullable();
            $table->string('staffing_unit')->nullable();
            $table->string('vacancy_category')->nullable();
            $table->string('region')->nullable();
            $table->enum('status', ['open', 'closed', 'paused', 'draft'])->default('open');
            $table->date('opening_date')->nullable();
            $table->date('planned_closing_date')->nullable();
            $table->unsignedInteger('planned_closing_days')->default(0);
            $table->foreignId('client_id')->nullable()->constrained()->nullOnDelete();
            $table->text('description')->nullable();
            $table->text('comment')->nullable();
            $table->string('work_address')->nullable();
            $table->string('mvz_code')->nullable();
            $table->string('work_schedule')->nullable();
            $table->string('opening_reason')->nullable();
            $table->string('fixed_salary')->nullable();
            $table->string('average_income')->nullable();
            $table->string('special_conditions')->nullable();
            $table->text('requirements')->nullable();
            $table->string('candidate_gender')->nullable();
            $table->string('donor_companies')->nullable();
            $table->string('interview_format')->nullable();
            $table->string('deadline_reason')->nullable();
            $table->string('reserve')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
