import { useForm } from '@inertiajs/react';
import VacancyForm from '../../Components/VacancyForm';
import '../../../css/admin.css';

const EMPTY = {
    title:                '',
    confidential:         false,
    department:           '',
    staffing_unit:        '',
    vacancy_category:     '',
    region:               '',
    status:               'open',
    opening_date:         new Date().toISOString().slice(0, 10),
    planned_closing_date: '',
    planned_closing_days: 0,
    client_id:            '',
    description:          '',
    comment:              '',
    work_address:         '',
    mvz_code:             '',
    work_schedule:        '',
    opening_reason:       '',
    fixed_salary:         '',
    average_income:       '',
    special_conditions:   '',
    requirements:         '',
    candidate_gender:     '',
    donor_companies:      '',
    interview_format:     '',
    deadline_reason:      '',
    reserve:              '',
};

export default function VacanciesCreate({ clients }) {
    const { data, setData, post, processing, errors } = useForm(EMPTY);

    return (
        <>
            <div className="topbar">
                <div className="topbar-title">Создание вакансии</div>
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
                        onSubmit={e => { e.preventDefault(); post('/vacancies'); }}
                        clients={clients}
                        submitLabel="Сохранить"
                        cancelHref="/vacancies"
                        isCreate
                    />
                </div>
            </div>
        </>
    );
}
