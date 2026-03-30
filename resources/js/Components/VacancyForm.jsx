import { Link } from '@inertiajs/react';
import RichEditor from './RichEditor';

export default function VacancyForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    clients,
    submitLabel = 'Сохранить',
    cancelHref,
    isCreate = false,
}) {
    return (
        <form onSubmit={onSubmit}>
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

            {isCreate && (
                <div className="field-note">
                    <span className="field-note-icon">⚠</span>
                    <span>Поля «Ответственный рекрутер» и «Сотрудники» станут доступны после создания вакансии.</span>
                </div>
            )}

            <div className="form-card" style={{ marginTop: isCreate ? 0 : 16, borderTop: isCreate ? 'none' : undefined }}>

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
                            <option value="Расширение команды">Расширение команды</option>
                            <option value="Расширение мобильной команды">Расширение мобильной команды</option>
                            <option value="Расширение QA-команды">Расширение QA-команды</option>
                            <option value="Расширение аналитической платформы">Расширение аналитической платформы</option>
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
                        {processing ? 'Сохранение...' : submitLabel}
                    </button>
                    <Link href={cancelHref} className="btn-cancel">Отмена</Link>
                </div>

            </div>
        </form>
    );
}
