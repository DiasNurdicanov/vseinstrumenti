import { useForm, Link } from '@inertiajs/react';
import RichEditor from '../../Components/RichEditor';

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

    function submit(e) {
        e.preventDefault();
        put(`/vacancies/${vacancy.id}`);
    }

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <>
            <style>{`
                *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
                body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#f0f2f5;color:#333;font-size:13px;min-height:100vh}
                .page-header{background:#fff;border-bottom:1px solid #e5e7eb;padding:0 24px;display:flex;align-items:center;gap:12px;height:52px;position:sticky;top:0;z-index:10}
                .back-link{display:inline-flex;align-items:center;gap:6px;color:#6b7280;text-decoration:none;font-size:13px;padding:5px 10px;border:1px solid #e5e7eb;border-radius:6px;background:#fff;transition:background .15s}
                .back-link:hover{background:#f3f4f6;color:#111}
                .page-header-title{font-size:16px;font-weight:600;color:#111827;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
                .page-body{padding:24px 0 48px}
                .container{max-width:880px;margin:0 auto;padding:0 24px}
                .alert-error{padding:12px 16px;border-radius:6px;margin-bottom:20px;font-size:13px;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca}
                .form-card{background:#fff;border:1px solid #e5e7eb}
                .fr{display:flex;align-items:flex-start;min-height:44px;border-bottom:1px solid #f0f0f0}
                .fr:last-of-type{border-bottom:none}
                .fr-label{width:220px;min-width:220px;padding:11px 16px 11px 20px;color:#374151;font-size:13px;line-height:1.4;flex-shrink:0}
                .fr-label.req::after{content:'*';color:#ef4444;margin-left:2px}
                .fr-field{flex:1;padding:7px 20px 7px 0;display:flex;flex-direction:column;gap:4px;justify-content:center}
                .fr-field.top{justify-content:flex-start;padding-top:10px}
                input[type="text"],input[type="date"],input[type="number"],input[type="email"],select,textarea{width:100%;padding:7px 10px;border:1px solid #d1d5db;border-radius:4px;font-size:13px;color:#111827;background:#fff;outline:none;font-family:inherit;transition:border-color .15s}
                input:focus,select:focus,textarea:focus{border-color:#3b82f6}
                input.is-invalid,select.is-invalid,textarea.is-invalid{border-color:#ef4444}
                input:disabled{background:#f9fafb;color:#9ca3af;cursor:not-allowed}
                textarea{resize:vertical;min-height:80px;line-height:1.5}
                select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:28px}
                .field-error{color:#ef4444;font-size:11px}
                .title-wrap{display:flex;align-items:center;gap:10px}
                .title-wrap input{flex:1}
                .conf-toggle{display:flex;align-items:center;gap:6px;font-size:11px;color:#6b7280;white-space:nowrap;margin-top:6px}
                .toggle-switch{position:relative;display:inline-block;width:32px;height:18px;flex-shrink:0}
                .toggle-switch input{display:none}
                .toggle-slider{position:absolute;inset:0;background:#d1d5db;border-radius:18px;cursor:pointer;transition:background .2s}
                .toggle-slider::before{content:'';position:absolute;width:12px;height:12px;background:#fff;border-radius:50%;top:3px;left:3px;transition:transform .2s}
                .toggle-switch input:checked+.toggle-slider{background:#3b82f6}
                .toggle-switch input:checked+.toggle-slider::before{transform:translateX(14px)}
                .closing-wrap{display:flex;align-items:center;gap:8px}
                .closing-wrap input[type="date"]{flex:1}
                .closing-days-label{color:#6b7280;font-size:13px;white-space:nowrap}
                .file-upload{border:1.5px dashed #d1d5db;border-radius:4px;padding:18px;text-align:center;color:#9ca3af;font-size:13px;cursor:pointer;background:#fafafa;transition:border-color .15s;width:100%}
                .file-upload:hover{border-color:#3b82f6}
                .file-upload span{color:#3b82f6;cursor:pointer}
                .form-actions{display:flex;align-items:center;gap:16px;padding:20px 20px 20px 220px;border-top:1px solid #e5e7eb}
                .btn-submit{padding:9px 28px;background:#3b82f6;color:#fff;border:none;border-radius:4px;font-size:14px;font-weight:500;cursor:pointer;transition:background .15s;font-family:inherit}
                .btn-submit:hover{background:#2563eb}
                .btn-submit:disabled{opacity:.6;cursor:not-allowed}
                .btn-cancel{color:#6b7280;text-decoration:none;font-size:13px;background:none;border:none;cursor:pointer;font-family:inherit}
                .btn-cancel:hover{color:#111}
            `}</style>

            <div className="page-header">
                <Link href="/vacancies" className="back-link">← Вакансии</Link>
                <div className="page-header-title">Редактирование: {vacancy.title}</div>
            </div>

            <div className="page-body">
                <div className="container">
                    {hasErrors && (
                        <div className="alert-error">Пожалуйста, исправьте ошибки в форме.</div>
                    )}

                    <form onSubmit={submit}>
                        <div className="form-card">

                            {/* Название вакансии */}
                            <div className="fr">
                                <div className="fr-label req">Название вакансии</div>
                                <div className="fr-field">
                                    <div className="title-wrap">
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className={errors.title ? 'is-invalid' : ''}
                                        />
                                    </div>
                                    <div className="conf-toggle">
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={data.confidential}
                                                onChange={e => setData('confidential', e.target.checked)}
                                            />
                                            <span className="toggle-slider" />
                                        </label>
                                        <span>Отключен режим конфиденциальности для вакансии</span>
                                    </div>
                                    {errors.title && <div className="field-error">{errors.title}</div>}
                                </div>
                            </div>

                            {/* Подразделение */}
                            <div className="fr">
                                <div className="fr-label">Подразделение</div>
                                <div className="fr-field">
                                    <select value={data.department} onChange={e => setData('department', e.target.value)}>
                                        <option value="">Не выбрано</option>
                                        <option value="HR">HR</option>
                                        <option value="IT">IT</option>
                                        <option value="Технологии и IT">Технологии и IT</option>
                                        <option value="Финансы">Финансы</option>
                                        <option value="Маркетинг">Маркетинг</option>
                                        <option value="Продажи">Продажи</option>
                                        <option value="Операционный">Операционный</option>
                                    </select>
                                </div>
                            </div>

                            {/* Штатная единица */}
                            <div className="fr">
                                <div className="fr-label">Штатная единица</div>
                                <div className="fr-field">
                                    <input type="text" value={data.staffing_unit} disabled />
                                </div>
                            </div>

                            {/* Категория вакансии */}
                            <div className="fr">
                                <div className="fr-label">Категория вакансии</div>
                                <div className="fr-field">
                                    <select value={data.vacancy_category} onChange={e => setData('vacancy_category', e.target.value)}>
                                        <option value="">Не назначен</option>
                                        <option value="Специалист">Специалист</option>
                                        <option value="Руководитель">Руководитель</option>
                                        <option value="Менеджер">Менеджер</option>
                                        <option value="Стажёр">Стажёр</option>
                                        <option value="Технологии и IT">Технологии и IT</option>
                                    </select>
                                </div>
                            </div>

                            {/* Регион */}
                            <div className="fr">
                                <div className="fr-label">Регион</div>
                                <div className="fr-field">
                                    <select value={data.region} onChange={e => setData('region', e.target.value)}>
                                        <option value="">— выберите —</option>
                                        <option value="Москва">Москва</option>
                                        <option value="Санкт-Петербург">Санкт-Петербург</option>
                                        <option value="Новосибирск">Новосибирск</option>
                                        <option value="Екатеринбург">Екатеринбург</option>
                                        <option value="Удалённо">Удалённо</option>
                                    </select>
                                </div>
                            </div>

                            {/* Статус */}
                            <div className="fr">
                                <div className="fr-label">Статус</div>
                                <div className="fr-field">
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className={errors.status ? 'is-invalid' : ''}
                                    >
                                        <option value="open">Открыта</option>
                                        <option value="closed">Закрыта</option>
                                        <option value="paused">Приостановлена</option>
                                        <option value="draft">Черновик</option>
                                    </select>
                                </div>
                            </div>

                            {/* Дата открытия */}
                            <div className="fr">
                                <div className="fr-label">Дата открытия</div>
                                <div className="fr-field">
                                    <input
                                        type="date"
                                        value={data.opening_date}
                                        onChange={e => setData('opening_date', e.target.value)}
                                        style={{ maxWidth: 180 }}
                                    />
                                </div>
                            </div>

                            {/* Плановое закрытие */}
                            <div className="fr">
                                <div className="fr-label">Плановое закрытие</div>
                                <div className="fr-field">
                                    <div className="closing-wrap">
                                        <input
                                            type="date"
                                            value={data.planned_closing_date}
                                            onChange={e => setData('planned_closing_date', e.target.value)}
                                            style={{ maxWidth: 180 }}
                                        />
                                        <input
                                            type="number"
                                            value={data.planned_closing_days}
                                            onChange={e => setData('planned_closing_days', e.target.value)}
                                            min="0"
                                            style={{ width: 60, textAlign: 'center' }}
                                        />
                                        <span className="closing-days-label">дней</span>
                                    </div>
                                </div>
                            </div>

                            {/* Заказчик */}
                            <div className="fr">
                                <div className="fr-label">Заказчик</div>
                                <div className="fr-field">
                                    <select value={data.client_id} onChange={e => setData('client_id', e.target.value)}>
                                        <option value="">Не назначен</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="form-card" style={{ marginTop: 16 }}>

                            {/* Файл */}
                            <div className="fr" style={{ alignItems: 'center' }}>
                                <div className="fr-label" />
                                <div className="fr-field" style={{ paddingTop: 10, paddingBottom: 10 }}>
                                    <label className="file-upload">
                                        <input type="file" name="attachment" style={{ display: 'none' }} />
                                        Перетащите сюда файл или <span>нажмите</span>, чтобы выбрать
                                    </label>
                                </div>
                            </div>

                            {/* Описание */}
                            <div className="fr" style={{ alignItems: 'flex-start' }}>
                                <div className="fr-label" style={{ paddingTop: 11 }}>Описание</div>
                                <div className="fr-field top" style={{ paddingTop: 10, paddingBottom: 10 }}>
                                    <RichEditor
                                        value={data.description}
                                        onChange={val => setData('description', val)}
                                    />
                                </div>
                            </div>

                            {/* Комментарий */}
                            <div className="fr" style={{ alignItems: 'flex-start' }}>
                                <div className="fr-label" style={{ paddingTop: 11 }}>Комментарий</div>
                                <div className="fr-field top">
                                    <textarea
                                        rows={3}
                                        value={data.comment}
                                        onChange={e => setData('comment', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Адрес места работы */}
                            <div className="fr">
                                <div className="fr-label req">Адрес места работы</div>
                                <div className="fr-field">
                                    <input
                                        type="text"
                                        value={data.work_address}
                                        onChange={e => setData('work_address', e.target.value)}
                                        placeholder="Введите текст"
                                        className={errors.work_address ? 'is-invalid' : ''}
                                    />
                                    {errors.work_address && <div className="field-error">{errors.work_address}</div>}
                                </div>
                            </div>

                            {/* Код МВЗ */}
                            <div className="fr">
                                <div className="fr-label req">Код МВЗ</div>
                                <div className="fr-field">
                                    <input
                                        type="text"
                                        value={data.mvz_code}
                                        onChange={e => setData('mvz_code', e.target.value)}
                                        placeholder="Введите текст"
                                        className={errors.mvz_code ? 'is-invalid' : ''}
                                    />
                                    {errors.mvz_code && <div className="field-error">{errors.mvz_code}</div>}
                                </div>
                            </div>

                            {/* График работы */}
                            <div className="fr">
                                <div className="fr-label req">График работы</div>
                                <div className="fr-field">
                                    <input
                                        type="text"
                                        value={data.work_schedule}
                                        onChange={e => setData('work_schedule', e.target.value)}
                                        placeholder="Введите текст"
                                        className={errors.work_schedule ? 'is-invalid' : ''}
                                    />
                                    {errors.work_schedule && <div className="field-error">{errors.work_schedule}</div>}
                                </div>
                            </div>

                            {/* Причина открытия вакансии */}
                            <div className="fr">
                                <div className="fr-label req">Причина открытия вакансии</div>
                                <div className="fr-field">
                                    <select
                                        value={data.opening_reason}
                                        onChange={e => setData('opening_reason', e.target.value)}
                                        className={errors.opening_reason ? 'is-invalid' : ''}
                                    >
                                        <option value="">Введите текст</option>
                                        <option value="Новая позиция">Новая позиция</option>
                                        <option value="Замена сотрудника">Замена сотрудника</option>
                                        <option value="Расширение штата">Расширение штата</option>
                                        <option value="Расширение аналитической платформы">Расширение аналитической платформы</option>
                                        <option value="Расширение команды">Расширение команды</option>
                                        <option value="Расширение мобильной команды">Расширение мобильной команды</option>
                                        <option value="Расширение QA-команды">Расширение QA-команды</option>
                                        <option value="Новое направление">Новое направление</option>
                                    </select>
                                    {errors.opening_reason && <div className="field-error">{errors.opening_reason}</div>}
                                </div>
                            </div>

                            {/* Фиксированная часть */}
                            <div className="fr">
                                <div className="fr-label req">Фиксированная часть</div>
                                <div className="fr-field">
                                    <input
                                        type="text"
                                        value={data.fixed_salary}
                                        onChange={e => setData('fixed_salary', e.target.value)}
                                        placeholder="Введите текст"
                                        className={errors.fixed_salary ? 'is-invalid' : ''}
                                    />
                                    {errors.fixed_salary && <div className="field-error">{errors.fixed_salary}</div>}
                                </div>
                            </div>

                            {/* Средний месячный доход */}
                            <div className="fr">
                                <div className="fr-label req">Средний месячный доход</div>
                                <div className="fr-field">
                                    <input
                                        type="text"
                                        value={data.average_income}
                                        onChange={e => setData('average_income', e.target.value)}
                                        placeholder="Введите текст"
                                        className={errors.average_income ? 'is-invalid' : ''}
                                    />
                                    {errors.average_income && <div className="field-error">{errors.average_income}</div>}
                                </div>
                            </div>

                            {/* Особые условия работы */}
                            <div className="fr">
                                <div className="fr-label req">Особые условия работы</div>
                                <div className="fr-field">
                                    <input
                                        type="text"
                                        value={data.special_conditions}
                                        onChange={e => setData('special_conditions', e.target.value)}
                                        placeholder="Введите текст"
                                        className={errors.special_conditions ? 'is-invalid' : ''}
                                    />
                                    {errors.special_conditions && <div className="field-error">{errors.special_conditions}</div>}
                                </div>
                            </div>

                            {/* Требования к кандидату */}
                            <div className="fr" style={{ alignItems: 'flex-start' }}>
                                <div className="fr-label req" style={{ paddingTop: 11 }}>Требования к кандидату</div>
                                <div className="fr-field top" style={{ paddingTop: 10, paddingBottom: 10 }}>
                                    <RichEditor
                                        value={data.requirements}
                                        onChange={val => setData('requirements', val)}
                                        invalid={!!errors.requirements}
                                    />
                                    {errors.requirements && <div className="field-error">{errors.requirements}</div>}
                                </div>
                            </div>

                            {/* Пол кандидата */}
                            <div className="fr">
                                <div className="fr-label req">Пол кандидата</div>
                                <div className="fr-field">
                                    <select
                                        value={data.candidate_gender}
                                        onChange={e => setData('candidate_gender', e.target.value)}
                                        className={errors.candidate_gender ? 'is-invalid' : ''}
                                    >
                                        <option value="">Введите текст</option>
                                        <option value="Не важно">Не важно</option>
                                        <option value="Мужской">Мужской</option>
                                        <option value="Женский">Женский</option>
                                    </select>
                                    {errors.candidate_gender && <div className="field-error">{errors.candidate_gender}</div>}
                                </div>
                            </div>

                            {/* Компании-доноры */}
                            <div className="fr">
                                <div className="fr-label req">Компании-доноры</div>
                                <div className="fr-field">
                                    <input
                                        type="text"
                                        value={data.donor_companies}
                                        onChange={e => setData('donor_companies', e.target.value)}
                                        placeholder="Введите текст"
                                        className={errors.donor_companies ? 'is-invalid' : ''}
                                    />
                                    {errors.donor_companies && <div className="field-error">{errors.donor_companies}</div>}
                                </div>
                            </div>

                            {/* График и формат собеседования */}
                            <div className="fr">
                                <div className="fr-label req">График и формат собеседования</div>
                                <div className="fr-field">
                                    <input
                                        type="text"
                                        value={data.interview_format}
                                        onChange={e => setData('interview_format', e.target.value)}
                                        placeholder="Введите текст"
                                        className={errors.interview_format ? 'is-invalid' : ''}
                                    />
                                    {errors.interview_format && <div className="field-error">{errors.interview_format}</div>}
                                </div>
                            </div>

                            {/* Причина установленного срока */}
                            <div className="fr">
                                <div className="fr-label">Причина установленного срока</div>
                                <div className="fr-field">
                                    <select value={data.deadline_reason} onChange={e => setData('deadline_reason', e.target.value)}>
                                        <option value="">Введите текст</option>
                                        <option value="Срочная потребность">Срочная потребность</option>
                                        <option value="Плановое расширение">Плановое расширение</option>
                                    </select>
                                </div>
                            </div>

                            {/* Резерв */}
                            <div className="fr">
                                <div className="fr-label req">Резерв</div>
                                <div className="fr-field">
                                    <select
                                        value={data.reserve}
                                        onChange={e => setData('reserve', e.target.value)}
                                        className={errors.reserve ? 'is-invalid' : ''}
                                    >
                                        <option value="">Введите текст</option>
                                        <option value="Да">Да</option>
                                        <option value="Нет">Нет</option>
                                    </select>
                                    {errors.reserve && <div className="field-error">{errors.reserve}</div>}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="form-actions">
                                <button type="submit" className="btn-submit" disabled={processing}>
                                    {processing ? 'Сохранение...' : 'Сохранить изменения'}
                                </button>
                                <Link href={`/vacancies/${vacancy.id}`} className="btn-cancel">Отмена</Link>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
