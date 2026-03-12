<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    protected $fillable = [
        'title',
        'confidential',
        'department',
        'staffing_unit',
        'vacancy_category',
        'region',
        'status',
        'opening_date',
        'planned_closing_date',
        'planned_closing_days',
        'client_id',
        'description',
        'comment',
        'work_address',
        'mvz_code',
        'work_schedule',
        'opening_reason',
        'fixed_salary',
        'average_income',
        'special_conditions',
        'requirements',
        'candidate_gender',
        'donor_companies',
        'interview_format',
        'deadline_reason',
        'reserve',
    ];

    protected $casts = [
        'confidential'         => 'boolean',
        'opening_date'         => 'date',
        'planned_closing_date' => 'date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
