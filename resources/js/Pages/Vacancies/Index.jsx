import { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import '../../../css/admin.css';

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
                          <Link href={`/vacancies/${v.id}`} className="vac-name" style={{ textDecoration: 'none' }}>{v.title}</Link>
                          {(v.fixed_salary || v.average_income) && (
                            <div className="vac-sub">
                              {v.fixed_salary ?? '—'} / {v.average_income ?? '0'}
                            </div>
                          )}
                          {v.region && <div className="vac-pubs">{v.region}</div>}
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
                          </div>
                        </td>

                        {/* Действия */}
                        <td>
                          <Link href={`/vacancies/${v.id}`} className="site-link">Посмотреть</Link>
                          <Link href={`/vacancies/${v.id}/edit`} className="edit-link">Редактировать</Link>
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
