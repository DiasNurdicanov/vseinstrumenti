import { Link } from '@inertiajs/react';
import '../../../css/show.css';

function fmtSalary(num) {
  if (num === null || num === undefined || num === '') return null;
  const n = Number(String(num).replace(/[\s,]/g, ''));
  if (isNaN(n)) return null;
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
}

export default function VacancyShow({ vacancy }) {
  const v = vacancy;

  const salaryRange = v.fixed_salary && v.average_income
    ? `${fmtSalary(v.fixed_salary)} – ${fmtSalary(v.average_income)} ₽/мес`
    : v.fixed_salary
      ? `${fmtSalary(v.fixed_salary)} ₽/мес`
      : v.average_income
        ? `до ${fmtSalary(v.average_income)} ₽/мес`
        : null;

  return (
    <div className='details-page'>
      <nav className="nav">
        <a href="/" className="nav-logo">
          <span className="nav-logo-box">ВИ</span>
          <span className="nav-logo-name">ВсеИнструменты</span>
        </a>
        <div className="nav-links">
          <a href="#" className="nav-a">Направления</a>
          <a href="#" className="nav-a">FAQ</a>
          <a href="#" className="nav-a">Контакты</a>
          <Link href="/vacancies" className="nav-a active">Вакансии</Link>
        </div>
        <a href="#send-resume" className="nav-btn">Отправить резюме</a>
      </nav>

      <div className="wrap">
        <Link href="/vacancies" className="back">← Назад</Link>

        {/* Hero */}
        <h1 className="hero-title">{v.title}</h1>
        {salaryRange && <div className="hero-salary">{salaryRange}</div>}
        <div className="hero-meta">
          {v.region && (
            <span className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              {v.region}
            </span>
          )}
          {v.work_schedule && (
            <span className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              {v.work_schedule}
            </span>
          )}
        </div>
        <div className="hero-tags">
          {v.work_schedule && <span className="tag">{v.work_schedule}</span>}
          {v.vacancy_category && <span className="tag">{v.vacancy_category}</span>}
          {v.department && <span className="tag">{v.department}</span>}
        </div>

        {/* О компании */}
        <div className="sec">
          <div className="sec-title">О компании</div>
          <div className="stats">
            <div className="stat"><span className="stat-ico">🏆</span><div><div className="stat-val">ТОП-3</div><div className="stat-lbl">DIY e-commerce в России</div></div></div>
            <div className="stat"><span className="stat-ico">👥</span><div><div className="stat-val">12&nbsp;000</div><div className="stat-lbl">сотрудников в команде</div></div></div>
            <div className="stat"><span className="stat-ico">📈</span><div><div className="stat-val">IPO</div><div className="stat-lbl">на Мосбирже</div></div></div>
            <div className="stat"><span className="stat-ico">🛒</span><div><div className="stat-val">7&nbsp;млн</div><div className="stat-lbl">заказов в год</div></div></div>
            <div className="stat"><span className="stat-ico">📦</span><div><div className="stat-val">500+</div><div className="stat-lbl">городов доставки</div></div></div>
            <div className="stat"><span className="stat-ico">🚀</span><div><div className="stat-val">+30%</div><div className="stat-lbl">рост в год</div></div></div>
          </div>
          <div className="red-banner">
            <div className="rb-text">
              <div className="rb-title">Подходит? Просто кидай резюме.</div>
              <div className="rb-sub">Без регистрации. Ответим за 3 рабочих дня.</div>
            </div>
            <a href="#send-resume" className="rb-btn">Отправить резюме</a>
          </div>
        </div>

        {/* О проекте */}
        {v.description && (
          <div className="sec">
            <div className="sec-title">О проекте / направлении</div>
            <div className="prose prose-tasks" dangerouslySetInnerHTML={{ __html: v.description }} />
          </div>
        )}

        {/* Требования */}
        {v.requirements && (
          <div className="sec">
            <div className="sec-title">Требования</div>
            <div className="prose prose-req" dangerouslySetInnerHTML={{ __html: v.requirements }} />
          </div>
        )}

        {/* Команда */}
        {(v.department || v.staffing_unit) && (
          <div className="sec">
            <div className="sec-title">Команда</div>
            <div style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>
              {v.department && <span>Подразделение: <strong>{v.department}</strong></span>}
              {v.staffing_unit && <span> &nbsp;·&nbsp; Штатная единица: <strong>{v.staffing_unit}</strong></span>}
            </div>
          </div>
        )}

        {/* Условия */}
        <div className="sec">
          <div className="sec-title">Условия</div>
          {salaryRange && (
            <>
              <div className="cond-salary">{salaryRange}</div>
              <div className="cond-note">до вычета НДФЛ</div>
            </>
          )}
          {v.work_schedule && (
            <div className="cond-block">
              <div className="cond-block-lbl">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                График
              </div>
              <div style={{ fontSize: 14, color: '#444' }}>
                с начала 9:00–11:00,&nbsp;{v.work_schedule}
              </div>
            </div>
          )}
          <div className="cond-block">
            <div className="cond-block-lbl">Бонусы</div>
            <ul className="bonus-list">
              <li><span className="bonus-dot"></span>Годовой бонус до 20%</li>
              <li><span className="bonus-dot"></span>Пересмотр зарплаты каждые 6 мес</li>
            </ul>
          </div>
          {v.special_conditions && (
            <div className="cond-block">
              <div className="cond-block-lbl">Особые условия</div>
              <div style={{ fontSize: 14, color: '#444' }}>{v.special_conditions}</div>
            </div>
          )}
          <div className="cond-block">
            <div className="cond-block-lbl">Плюшки</div>
            <div className="perks">
              <span className="perk">ДМС</span>
              <span className="perk">Корпоративное обучение</span>
              <span className="perk">Скидки для сотрудников</span>
              <span className="perk">Гибкий старт дня</span>
            </div>
          </div>
        </div>

        {/* Карьерный рост */}
        <div className="sec">
          <div className="career-hd">
            <div className="sec-title" style={{ marginBottom: 0 }}>Карьерный рост</div>
            <div className="career-note">8 в среднем senior за 2 года</div>
          </div>
          <div className="career-grid">
            <div className="career-cell"><div className="career-lvl">Junior</div><div className="career-desc">Знакомство с процессами и кодовой базой</div></div>
            <div className="career-cell"><div className="career-lvl">Middle</div><div className="career-desc">Самостоятельная разработка фич</div></div>
            <div className="career-cell"><div className="career-lvl">Middle+</div><div className="career-desc">Техлид небольших задач</div></div>
            <div className="career-cell"><div className="career-lvl">Senior</div><div className="career-desc">Архитектурные решения и менторинг</div></div>
          </div>
        </div>

        {/* Этапы отбора */}
        <div className="sec">
          <div className="sec-title">Этапы отбора</div>
          <div className="stages">
            <div className="stage"><div className="stage-num">1</div><div className="stage-ttl">Отклик</div><div className="stage-dsc">Кидай резюме. Без анкет на 40 полей</div></div>
            <div className="stage"><div className="stage-num">2</div><div className="stage-ttl">Созвон</div><div className="stage-dsc">20–30 минут с HR. Без допросов</div></div>
            <div className="stage"><div className="stage-num">3</div><div className="stage-ttl">Интервью</div><div className="stage-dsc">Встреча с теми, с кем будешь работать</div></div>
            <div className="stage"><div className="stage-num">4</div><div className="stage-ttl">Оффер</div><div className="stage-dsc">Наконец подписание</div></div>
          </div>
        </div>

        {/* Dark CTA */}
        <div className="dark-cta" id="send-resume">
          <div className="dark-cta-ttl">Ну что, заходишь?</div>
          <div className="dark-cta-sub">Кидай резюме — ответим за 3 рабочих дня.</div>
          <a href="mailto:hr@vseinstrumenti.ru" className="dark-cta-btn">Отправить резюме</a>
        </div>

        {/* Newsletter */}
        <div className="newsletter">
          <span className="nl-ico">✉️</span>
          <div className="nl-txt">Подпишитесь на рассылку и будьте в курсе акций!</div>
          <div className="nl-form">
            <input className="nl-input" type="email" placeholder="Введите email" />
            <button className="nl-btn">Подписаться</button>
          </div>
        </div>
      </div>
    </div>
  );
}
