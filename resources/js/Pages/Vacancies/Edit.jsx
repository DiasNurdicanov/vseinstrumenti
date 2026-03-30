import { useForm, Link } from '@inertiajs/react';
import VacancyForm from '../../Components/VacancyForm';
import '../../../css/admin.css';

export default function VacanciesEdit({ vacancy, clients }) {
    const { data, setData, put, processing, errors } = useForm({
        title:                vacancy.title                ?? '',
        confidential:         vacancy.confidential         ?? false,
        department:           vacancy.department           ?? '',
        staffing_unit:        vacancy.staffing_unit        ?? '',
        vacancy_category:     vacancy.vacancy_category     ?? '',
        region:               vacancy.region               ?? '',
        status:               vacancy.status               ?? 'open',
        opening_date:         vacancy.opening_date         ?? '',
        planned_closing_date: vacancy.planned_closing_date ?? '',
        planned_closing_days: vacancy.planned_closing_days ?? 0,
        client_id:            vacancy.client_id            ?? '',
        description:          vacancy.description          ?? '',
        comment:              vacancy.comment              ?? '',
        work_address:         vacancy.work_address         ?? '',
        mvz_code:             vacancy.mvz_code             ?? '',
        work_schedule:        vacancy.work_schedule        ?? '',
        opening_reason:       vacancy.opening_reason       ?? '',
        fixed_salary:         vacancy.fixed_salary         ?? '',
        average_income:       vacancy.average_income       ?? '',
        special_conditions:   vacancy.special_conditions   ?? '',
        requirements:         vacancy.requirements         ?? '',
        candidate_gender:     vacancy.candidate_gender     ?? '',
        donor_companies:      vacancy.donor_companies      ?? '',
        interview_format:     vacancy.interview_format     ?? '',
        deadline_reason:      vacancy.deadline_reason      ?? '',
        reserve:              vacancy.reserve              ?? '',
    });

    return (
        <>
            <div className="topbar">
                <Link href="/vacancies" className="back-link">← Вакансии</Link>
                <div className="page-header-title">Редактирование: {vacancy.title}</div>
            </div>

            <div className="page-body">
                <div className="container">
                    {Object.keys(errors).length > 0 && (
                        <div className="alert-error">Пожалуйста, исправьте ошибки в форме.</div>
                    )}
                    <VacancyForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={e => { e.preventDefault(); put(`/vacancies/${vacancy.id}`); }}
                        clients={clients}
                        submitLabel="Сохранить изменения"
                        cancelHref={`/vacancies/${vacancy.id}`}
                    />
                </div>
            </div>
        </>
    );
}
