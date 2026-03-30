import { useState } from 'react';
import { router, Link } from '@inertiajs/react';

const STATUS_LABELS = {
  open: 'Открыта',
  closed: 'Закрыта',
  paused: 'Приостановлена',
  draft: 'Черновик',
};

export default function VacanciesIndex({ vacancies, clients, departments, filters }) {
  const [search, setSearch] = useState(filters.search ?? '');
  const [filterClient, setFilterClient] = useState(filters.filter_client ?? '');
  const [filterDept, setFilterDept] = useState(filters.filter_department ?? '');
  const [filterStatus, setFilterStatus] = useState(filters.filter_status ?? '');
  const [panelOpen, setPanelOpen] = useState(
    !!(filters.filter_client || filters.filter_department || filters.filter_status)
  );

  function applyFilters(overrides = {}) {
    const params = {
      search: search,
      filter_client: filterClient,
      filter_department: filterDept,
      filter_status: filterStatus,
      ...overrides,
    };
    // remove empty
    Object.keys(params).forEach(k => { if (!params[k]) delete params[k]; });
    router.get('/vacancies', params, { preserveState: true, replace: true });
  }

  function resetFilters() {
    setSearch('');
    setFilterClient('');
    setFilterDept('');
    setFilterStatus('');
    router.get('/vacancies', {}, { preserveState: false });
  }

  function removeFilter(key) {
    const updates = { search, filter_client: filterClient, filter_department: filterDept, filter_status: filterStatus };
    delete updates[key];
    if (key === 'filter_client') setFilterClient('');
    if (key === 'filter_department') setFilterDept('');
    if (key === 'filter_status') setFilterStatus('');
    if (key === 'search') setSearch('');
    const params = { ...updates };
    Object.keys(params).forEach(k => { if (!params[k]) delete params[k]; });
    router.get('/vacancies', params, { preserveState: true, replace: true });
  }

  const hasFilters = filterClient || filterDept || filterStatus;

  return (
    <>
      <style>{`
                *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
                body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#f0f2f5;color:#333;font-size:13px;min-height:100vh}
                .topbar{background:#fff;border-bottom:1px solid #e5e7eb;padding:0 24px;display:flex;align-items:center;gap:12px;height:52px;position:sticky;top:0;z-index:10}
                .topbar-title{font-size:20px;font-weight:700;color:#111827;display:flex;align-items:center;gap:6px;white-space:nowrap}
                .topbar-title .count{font-size:20px;font-weight:700;color:#111827}
                .sort-select{padding:5px 10px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px;background:#fff;color:#374151;cursor:pointer;appearance:none;padding-right:24px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7280' d='M6 8L0 0h12z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;font-family:inherit}
                .search-wrap{flex:1;max-width:280px;position:relative}
                .search-wrap input{width:100%;padding:6px 10px 6px 32px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px;background:#f9fafb;outline:none;font-family:inherit;color:#374151}
                .search-wrap input:focus{border-color:#3b82f6;background:#fff}
                .search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#9ca3af;font-size:13px;pointer-events:none}
                .topbar-spacer{flex:1}
                .icon-btn{padding:6px 10px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;font-size:13px;cursor:pointer;color:#6b7280;display:flex;align-items:center;gap:5px;transition:background .15s,border-color .15s;white-space:nowrap}
                .icon-btn:hover{background:#f3f4f6}
                .icon-btn.active{background:#eff6ff;border-color:#3b82f6;color:#2563eb}
                .btn-add{padding:6px 14px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:18px;font-weight:400;cursor:pointer;line-height:1;text-decoration:none;display:flex;align-items:center;transition:background .15s}
                .btn-add:hover{background:#2563eb}
                .btn-reset{background:none;border:none;font-size:12px;color:#6b7280;cursor:pointer;padding:0 4px;text-decoration:none}
                .btn-reset:hover{color:#111}
                .active-filters{display:flex;align-items:center;gap:6px;padding:8px 24px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:12px;flex-wrap:wrap}
                .filter-tag{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:4px;color:#1d4ed8;font-size:12px}
                .filter-tag button{color:#6b7280;background:none;border:none;font-size:13px;margin-left:2px;cursor:pointer;line-height:1}
                .filter-tag button:hover{color:#111}
                .page-container{max-width:1600px;margin:0 auto;padding:0 24px}
                .main-layout{display:flex;align-items:flex-start;min-height:calc(100vh - 92px)}
                .table-wrap{flex:1;min-width:0}
                .table-scroll{overflow-x:auto}
                .vac-table{width:100%;border-collapse:separate;border-spacing:0;font-size:13px;min-width:820px}
                .vac-table th{padding:10px 14px;text-align:left;font-size:12px;font-weight:500;color:#6b7280;background:#f9fafb;border-bottom:1px solid #e5e7eb;white-space:nowrap}
                .vac-table td{padding:14px;border-bottom:1px solid #f0f0f0;vertical-align:top;color:#374151;background:#fafafa}
                .vac-name{font-weight:600;color:#111827;font-size:13px;line-height:1.4}
                .vac-sub{font-size:12px;color:#3b82f6;margin-top:3px}
                .vac-pubs{font-size:11px;color:#9ca3af;margin-top:4px}
                .status-date{font-size:12px;color:#374151;margin-bottom:5px}
                .status-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border:1px solid #e5e7eb;border-radius:4px;font-size:12px;background:#fff;color:#374151;white-space:nowrap}
                .status-badge.open{border-color:#86efac;background:#f0fdf4;color:#166534}
                .status-badge.closed{border-color:#d1d5db;background:#f9fafb;color:#6b7280}
                .status-badge.paused{border-color:#fed7aa;background:#fff7ed;color:#c2410c}
                .status-badge.draft{border-color:#e5e7eb;background:#f9fafb;color:#6b7280}
                .closing-date{font-size:12px;color:#374151}
                .closing-days{display:inline-block;font-size:11px;color:#3b82f6;font-weight:500;margin-left:6px}
                .closing-days.overdue{color:#ef4444}
                .candidates-cell{display:flex;align-items:flex-start;gap:8px}
                .candidates-counts{line-height:1.8}
                .cand-new,.cand-all{font-size:12px;color:#374151}
                .cand-num{font-weight:600;color:#111827}
                .cell-actions{display:flex;gap:4px;margin-top:2px;opacity:0;transition:opacity .15s}
                tr:hover .cell-actions{opacity:1}
                .cell-action-btn{padding:3px 6px;border:1px solid #e5e7eb;border-radius:4px;background:#fff;font-size:12px;cursor:pointer;color:#6b7280}
                .cell-action-btn:hover{background:#f3f4f6;color:#374151}
                .empty-state{text-align:center;padding:80px 24px;color:#9ca3af}
                .empty-state-title{font-size:16px;font-weight:600;color:#6b7280;margin-bottom:8px}
                .empty-state-text{font-size:13px;margin-bottom:20px}
                .btn-primary{display:inline-block;padding:8px 20px;background:#3b82f6;color:#fff;border-radius:6px;text-decoration:none;font-size:13px;font-weight:500}
                .filter-panel{width:280px;min-width:280px;background:#fff;border-left:1px solid #e5e7eb;padding:0;display:none;flex-direction:column;min-height:calc(100vh - 92px)}
                .filter-panel.open{display:flex}
                .filter-header{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:14px;color:#111827}
                .filter-close{background:none;border:none;font-size:18px;color:#6b7280;cursor:pointer;line-height:1;padding:0 4px}
                .filter-close:hover{color:#111}
                .filter-body{flex:1;padding:16px 20px;display:flex;flex-direction:column;gap:18px;overflow-y:auto}
                .filter-group label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:6px}
                .filter-group select,.filter-group input{width:100%;padding:7px 10px;border:1px solid #d1d5db;border-radius:4px;font-size:13px;color:#374151;background:#fff;outline:none;font-family:inherit;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7280' d='M6 8L0 0h12z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:28px}
                .filter-group input{background-image:none;padding-right:10px}
                .filter-group select:focus,.filter-group input:focus{border-color:#3b82f6}
                .filter-footer{padding:16px 20px;border-top:1px solid #e5e7eb;display:flex;align-items:center;gap:16px}
                .btn-apply{flex:1;padding:9px;background:#3b82f6;color:#fff;border:none;border-radius:4px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:background .15s}
                .btn-apply:hover{background:#2563eb}
                .btn-reset-filter{background:none;border:none;font-size:13px;color:#6b7280;cursor:pointer;padding:0;font-family:inherit}
                .btn-reset-filter:hover{color:#111}
                .site-link{font-size:12px;color:#3b82f6;text-decoration:none;white-space:nowrap}
                .site-link:hover{text-decoration:underline}
            `}</style>

      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-title">
          Вакансии <span className="count">{vacancies.length}</span>
        </div>

        <select
          className="sort-select"
          value={filterStatus}
          onChange={e => {
            setFilterStatus(e.target.value);
            applyFilters({ filter_status: e.target.value });
          }}
        >
          <option value="">Все статусы</option>
          <option value="open">Открыта</option>
          <option value="closed">Закрыта</option>
          <option value="paused">Приостановлена</option>
          <option value="draft">Черновик</option>
        </select>

        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Поиск"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyFilters({ search: e.target.value })}
          />
        </div>

        <div className="topbar-spacer" />

        <button
          className={`icon-btn${panelOpen ? ' active' : ''}`}
          onClick={() => setPanelOpen(o => !o)}
        >
          <span>▼</span> Фильтр
        </button>

        <Link href="/vacancies/create" className="btn-add" title="Создать вакансию">+</Link>
      </div>

      {/* Active filter tags */}
      {hasFilters && (
        <div className="active-filters">
          {filterClient && (
            <span className="filter-tag">
              Заказчик: {clients.find(c => String(c.id) === String(filterClient))?.name ?? filterClient}
              <button onClick={() => removeFilter('filter_client')}>×</button>
            </span>
          )}
          {filterDept && (
            <span className="filter-tag">
              Подразделение: {filterDept}
              <button onClick={() => removeFilter('filter_department')}>×</button>
            </span>
          )}
          {filterStatus && (
            <span className="filter-tag">
              Статус: {STATUS_LABELS[filterStatus] ?? filterStatus}
              <button onClick={() => removeFilter('filter_status')}>×</button>
            </span>
          )}
          <button className="btn-reset" onClick={resetFilters}>× Сброс</button>
        </div>
      )}

      {/* Main layout */}
      <div className="page-container">
        <div className="main-layout">

          {/* Table */}
          <div className="table-wrap">
            {vacancies.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
                <div className="empty-state-title">Вакансий нет</div>
                <div className="empty-state-text">Добавьте первую вакансию, чтобы начать подбор.</div>
                <Link href="/vacancies/create" className="btn-primary">+ Добавить вакансию</Link>
              </div>
            ) : (
              <div className="table-scroll">
                <table className="vac-table">
                  <thead>
                    <tr>
                      <th style={{ width: 220 }}>Название</th>
                      <th style={{ width: 130 }}>Статус</th>
                      <th style={{ width: 140 }}>Плановое закрытие</th>
                      <th style={{ width: 150 }}>Ответственный рекрутер</th>
                      <th>Сотрудники</th>
                      <th style={{ width: 110 }}>Заказчик</th>
                      <th style={{ width: 120 }}>Кандидаты</th>
                      <th style={{ width: 150 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {vacancies.map(v => (
                      <tr key={v.id}>
                        {/* Название */}
                        <td>
                          <div className="vac-name">{v.title}</div>
                          {(v.fixed_salary || v.average_income) && (
                            <div className="vac-sub">
                              {v.fixed_salary ?? '—'} / {v.average_income ?? '0'}
                            </div>
                          )}
                          {v.region && <div className="vac-pubs">{v.region}</div>}
                          <Link href={`/vacancies/${v.id}`} className="site-link">Посмотреть на сайте</Link>
                        </td>

                        {/* Статус */}
                        <td>
                          <div className="status-date">{v.opening_date ?? '—'}</div>
                          <div className={`status-badge ${v.status}`}>
                            {STATUS_LABELS[v.status] ?? v.status}
                          </div>
                        </td>

                        {/* Плановое закрытие */}
                        <td>
                          {v.planned_closing_date ? (
                            <>
                              <span className="closing-date">{v.planned_closing_date}</span>
                              {v.days_left !== null && (
                                <span className={`closing-days${v.days_left < 0 ? ' overdue' : ''}`}>
                                  {Math.abs(v.days_left)} дн{v.days_left < 0 ? ' просрочено' : ''}
                                </span>
                              )}
                            </>
                          ) : (
                            <span style={{ color: '#9ca3af' }}>—</span>
                          )}
                        </td>

                        {/* Ответственный рекрутер */}
                        <td><span style={{ color: '#9ca3af', fontSize: 12 }}>—</span></td>

                        {/* Сотрудники */}
                        <td><span style={{ color: '#9ca3af', fontSize: 12 }}>—</span></td>

                        {/* Заказчик */}
                        <td>
                          <span style={{ fontSize: 13 }}>
                            {v.client?.name ?? '—'}
                          </span>
                        </td>

                        {/* Кандидаты */}
                        <td>
                          <div className="candidates-cell">
                            <div className="candidates-counts">
                              <div className="cand-new">Новые: <span className="cand-num">0</span></div>
                              <div className="cand-all">Все: <span className="cand-num">0</span></div>
                            </div>
                            <div className="cell-actions">
                              <button className="cell-action-btn" title="Редактировать">✎</button>
                              <button className="cell-action-btn" title="Ещё">•••</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Filter panel */}
          <div className={`filter-panel${panelOpen ? ' open' : ''}`}>
            <div className="filter-header">
              <span>▼ Фильтр</span>
              <button className="filter-close" onClick={() => setPanelOpen(false)}>×</button>
            </div>

            <div className="filter-body">
              <div className="filter-group">
                <label>Заказчик</label>
                <select value={filterClient} onChange={e => setFilterClient(e.target.value)}>
                  <option value="">Все заказчики</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Подразделение</label>
                <select value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                  <option value="">Все подразделения</option>
                  {departments.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Статус</label>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="">Все</option>
                  <option value="open">Открыта</option>
                  <option value="closed">Закрыта</option>
                  <option value="paused">Приостановлена</option>
                  <option value="draft">Черновик</option>
                </select>
              </div>
            </div>

            <div className="filter-footer">
              <button className="btn-apply" onClick={() => applyFilters()}>Применить</button>
              <button className="btn-reset-filter" onClick={resetFilters}>Сбросить</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
