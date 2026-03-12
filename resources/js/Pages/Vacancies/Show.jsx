import { Link } from '@inertiajs/react';

const STATUS_LABELS = {
    open:   'Открыта',
    closed: 'Закрыта',
    paused: 'Приостановлена',
    draft:  'Черновик',
};

function Row({ label, value }) {
    if (!value && value !== 0) return null;
    return (
        <tr>
            <td className="detail-label">{label}</td>
            <td className="detail-value">{value}</td>
        </tr>
    );
}

export default function VacancyShow({ vacancy }) {
    const v = vacancy;

    return (
        <>
            <style>{`
                *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
                body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#f0f2f5;color:#333;font-size:13px;min-height:100vh}
                .topbar{background:#fff;border-bottom:1px solid #e5e7eb;padding:0 24px;display:flex;align-items:center;gap:12px;height:52px;position:sticky;top:0;z-index:10}
                .back-link{display:inline-flex;align-items:center;gap:6px;color:#6b7280;text-decoration:none;font-size:13px;padding:5px 10px;border:1px solid #e5e7eb;border-radius:6px;background:#fff;transition:background .15s}
                .back-link:hover{background:#f3f4f6;color:#111}
                .topbar-title{font-size:18px;font-weight:700;color:#111827;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
                .status-badge{display:inline-flex;align-items:center;padding:4px 12px;border:1px solid #e5e7eb;border-radius:4px;font-size:12px;background:#fff;color:#374151;white-space:nowrap}
                .status-badge.open{border-color:#86efac;background:#f0fdf4;color:#166534}
                .status-badge.closed{border-color:#d1d5db;background:#f9fafb;color:#6b7280}
                .status-badge.paused{border-color:#fed7aa;background:#fff7ed;color:#c2410c}
                .status-badge.draft{border-color:#e5e7eb;background:#f9fafb;color:#6b7280}
                .page-container{max-width:900px;margin:24px auto;padding:0 24px}
                .card{background:#fff;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:16px}
                .card-header{padding:14px 20px;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#374151;text-transform:uppercase;letter-spacing:.04em}
                .card-body{padding:4px 0}
                .detail-table{width:100%;border-collapse:collapse}
                .detail-label{padding:9px 20px;font-size:12px;color:#6b7280;width:220px;vertical-align:top;white-space:nowrap}
                .detail-value{padding:9px 20px 9px 0;font-size:13px;color:#111827;vertical-align:top}
                .detail-table tr:not(:last-child) td{border-bottom:1px solid #f9fafb}
                .prose{padding:16px 20px;font-size:13px;color:#374151;line-height:1.6;white-space:pre-wrap}
                .closing-days{font-size:11px;color:#3b82f6;font-weight:500;margin-left:8px}
                .closing-days.overdue{color:#ef4444}
                .confidential-badge{display:inline-block;padding:2px 8px;background:#fef3c7;border:1px solid #fcd34d;border-radius:4px;font-size:11px;color:#92400e;margin-left:8px}
            `}</style>

            {/* Top bar */}
            <div className="topbar">
                <Link href="/vacancies" className="back-link">← Вакансии</Link>
                <div className="topbar-title">
                    {v.title}
                    {v.confidential && <span className="confidential-badge">Конфиденциально</span>}
                </div>
                <div className={`status-badge ${v.status}`}>{STATUS_LABELS[v.status] ?? v.status}</div>
            </div>

            <div className="page-container">

                {/* Основная информация */}
                <div className="card">
                    <div className="card-header">Основная информация</div>
                    <div className="card-body">
                        <table className="detail-table">
                            <tbody>
                                <Row label="Заказчик" value={v.client?.name} />
                                <Row label="Подразделение" value={v.department} />
                                <Row label="Штатная единица" value={v.staffing_unit} />
                                <Row label="Категория вакансии" value={v.vacancy_category} />
                                <Row label="Регион" value={v.region} />
                                <Row label="Дата открытия" value={v.opening_date} />
                                <Row label="Плановое закрытие" value={
                                    v.planned_closing_date
                                        ? <>
                                            {v.planned_closing_date}
                                            {v.days_left !== null && (
                                                <span className={`closing-days${v.days_left < 0 ? ' overdue' : ''}`}>
                                                    {Math.abs(v.days_left)} дн{v.days_left < 0 ? ' просрочено' : ''}
                                                </span>
                                            )}
                                          </>
                                        : null
                                } />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Условия */}
                <div className="card">
                    <div className="card-header">Условия</div>
                    <div className="card-body">
                        <table className="detail-table">
                            <tbody>
                                <Row label="Фиксированный оклад" value={v.fixed_salary} />
                                <Row label="Средний доход" value={v.average_income} />
                                <Row label="Адрес работы" value={v.work_address} />
                                <Row label="Код МВЗ" value={v.mvz_code} />
                                <Row label="График работы" value={v.work_schedule} />
                                <Row label="Причина открытия" value={v.opening_reason} />
                                <Row label="Особые условия" value={v.special_conditions} />
                                <Row label="Пол кандидата" value={v.candidate_gender} />
                                <Row label="Компании-доноры" value={v.donor_companies} />
                                <Row label="Формат интервью" value={v.interview_format} />
                                <Row label="Причина дедлайна" value={v.deadline_reason} />
                                <Row label="Резерв" value={v.reserve} />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Описание */}
                {v.description && (
                    <div className="card">
                        <div className="card-header">Описание</div>
                        <div className="prose">{v.description}</div>
                    </div>
                )}

                {/* Требования */}
                {v.requirements && (
                    <div className="card">
                        <div className="card-header">Требования</div>
                        <div className="prose">{v.requirements}</div>
                    </div>
                )}

                {/* Комментарий */}
                {v.comment && (
                    <div className="card">
                        <div className="card-header">Комментарий</div>
                        <div className="prose">{v.comment}</div>
                    </div>
                )}

            </div>
        </>
    );
}
