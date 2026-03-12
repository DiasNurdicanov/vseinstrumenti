<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VacancyController extends Controller
{
    public function index(Request $request)
    {
        $query = Vacancy::with('client')->latest();

        if ($request->filled('filter_client')) {
            $query->where('client_id', $request->filter_client);
        }

        if ($request->filled('filter_department')) {
            $query->where('department', $request->filter_department);
        }

        if ($request->filled('filter_status')) {
            $query->where('status', $request->filter_status);
        }

        if ($request->filled('search')) {
            $q = $request->search;
            $query->where('title', 'like', "%{$q}%");
        }

        $vacancies   = $query->get()->map(fn($v) => [
            'id'                   => $v->id,
            'title'                => $v->title,
            'confidential'         => $v->confidential,
            'department'           => $v->department,
            'region'               => $v->region,
            'status'               => $v->status,
            'opening_date'         => $v->opening_date?->format('d.m.y'),
            'planned_closing_date' => $v->planned_closing_date?->format('d.m.y'),
            'days_left'            => $v->planned_closing_date
                ? (int) now()->diffInDays($v->planned_closing_date, false)
                : null,
            'fixed_salary'         => $v->fixed_salary,
            'average_income'       => $v->average_income,
            'client'               => $v->client ? ['id' => $v->client->id, 'name' => $v->client->name] : null,
        ]);

        $clients     = Client::orderBy('name')->get(['id', 'name']);
        $departments = Vacancy::distinct()->orderBy('department')->pluck('department')->filter()->values();

        return Inertia::render('Vacancies/Index', [
            'vacancies'   => $vacancies,
            'clients'     => $clients,
            'departments' => $departments,
            'filters'     => $request->only('filter_client', 'filter_department', 'filter_status', 'search'),
        ]);
    }

    public function create()
    {
        $clients = Client::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Vacancies/Create', [
            'clients' => $clients,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'                => 'required|string|max:255',
            'confidential'         => 'boolean',
            'department'           => 'nullable|string|max:255',
            'staffing_unit'        => 'nullable|string|max:255',
            'vacancy_category'     => 'nullable|string|max:255',
            'region'               => 'nullable|string|max:255',
            'status'               => 'required|in:open,closed,paused,draft',
            'opening_date'         => 'nullable|date',
            'planned_closing_date' => 'nullable|date',
            'planned_closing_days' => 'nullable|integer|min:0',
            'client_id'            => 'nullable|exists:clients,id',
            'description'          => 'nullable|string',
            'comment'              => 'nullable|string',
            'work_address'         => 'required|string|max:255',
            'mvz_code'             => 'required|string|max:255',
            'work_schedule'        => 'required|string|max:255',
            'opening_reason'       => 'required|string|max:255',
            'fixed_salary'         => 'required|string|max:255',
            'average_income'       => 'required|string|max:255',
            'special_conditions'   => 'required|string|max:255',
            'requirements'         => 'required|string',
            'candidate_gender'     => 'required|string|max:50',
            'donor_companies'      => 'required|string|max:255',
            'interview_format'     => 'required|string|max:255',
            'deadline_reason'      => 'nullable|string|max:255',
            'reserve'              => 'required|string|max:255',
        ]);

        $validated['confidential'] = $request->boolean('confidential');

        Vacancy::create($validated);

        return redirect()->route('vacancies.index')
            ->with('success', 'Вакансия успешно создана.');
    }
}
