import { Link } from '@inertiajs/react';

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
        <>
            <style>{`
                *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
                body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#fff;color:#1a1a1a;font-size:14px;line-height:1.5}

                /* ── NAV ── */
                .nav{background:#fff;border-bottom:1px solid #e8e8e8;padding:0 40px;display:flex;align-items:center;height:56px;gap:32px;position:sticky;top:0;z-index:50}
                .nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;margin-right:8px}
                .nav-logo-box{background:#D71F26;color:#fff;font-weight:800;font-size:13px;padding:5px 8px;border-radius:3px;letter-spacing:.03em;line-height:1}
                .nav-logo-name{font-size:15px;font-weight:700;color:#1a1a1a;white-space:nowrap}
                .nav-links{display:flex;align-items:center;gap:24px;flex:1}
                .nav-a{font-size:13px;color:#444;text-decoration:none;padding:2px 0}
                .nav-a:hover{color:#D71F26}
                .nav-a.active{color:#1a1a1a;font-weight:600;border-bottom:2px solid #D71F26}
                .nav-btn{margin-left:auto;background:#D71F26;color:#fff;padding:8px 20px;border-radius:4px;font-size:13px;font-weight:600;text-decoration:none;white-space:nowrap}
                .nav-btn:hover{background:#bb1920}

                /* ── PAGE ── */
                .wrap{max-width:760px;margin:0 auto;padding:28px 24px 80px}

                .back{display:inline-flex;align-items:center;gap:5px;font-size:13px;color:#666;text-decoration:none;margin-bottom:22px}
                .back:hover{color:#D71F26}

                /* ── HERO ── */
                .hero-title{font-size:28px;font-weight:700;line-height:1.2;margin-bottom:8px;color:#111}
                .hero-salary{font-size:20px;font-weight:600;color:#111;margin-bottom:12px}
                .hero-meta{display:flex;align-items:center;gap:20px;font-size:13px;color:#555;margin-bottom:14px;flex-wrap:wrap}
                .hero-meta-item{display:flex;align-items:center;gap:5px}
                .hero-meta svg{color:#888;flex-shrink:0}
                .hero-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px}
                .tag{display:inline-block;padding:4px 14px;border-radius:20px;border:1px solid #d4d4d4;font-size:12px;color:#444;background:#f8f8f8;white-space:nowrap}

                /* ── SECTION ── */
                .sec{margin-bottom:40px}
                .sec-title{font-size:20px;font-weight:700;color:#111;margin-bottom:16px;line-height:1.2}

                /* ── COMPANY STATS ── */
                .stats{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;margin-bottom:14px}
                .stat{display:flex;align-items:flex-start;gap:12px;padding:16px;border-right:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;background:#fff}
                .stat:nth-child(3n){border-right:none}
                .stat:nth-last-child(-n+3){border-bottom:none}
                .stat-ico{font-size:20px;flex-shrink:0;margin-top:1px}
                .stat-val{font-size:17px;font-weight:700;color:#111;line-height:1.1}
                .stat-lbl{font-size:11px;color:#888;margin-top:2px;line-height:1.3}

                .red-banner{background:#D71F26;border-radius:6px;padding:16px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px}
                .rb-text .rb-title{font-size:15px;font-weight:700;color:#fff}
                .rb-text .rb-sub{font-size:12px;color:rgba(255,255,255,.8);margin-top:2px}
                .rb-btn{background:#fff;color:#D71F26;padding:9px 20px;border-radius:4px;font-size:13px;font-weight:700;text-decoration:none;white-space:nowrap;flex-shrink:0}
                .rb-btn:hover{opacity:.92}

                /* ── PROSE (rich html from editor) ── */
                .prose{font-size:14px;color:#333;line-height:1.7}
                .prose p{margin-bottom:12px}
                .prose p:last-child{margin-bottom:0}

                /* headings inside prose (e.g. <h3>Задачи</h3>) */
                .prose h1,.prose h2,.prose h3{font-size:20px;font-weight:700;color:#111;line-height:1.2;margin-top:24px;margin-bottom:12px}
                .prose h1:first-child,.prose h2:first-child,.prose h3:first-child{margin-top:0}

                /* task list — red → arrow (used in description) */
                .prose-tasks ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
                .prose-tasks ul li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#333;line-height:1.5;padding:0}
                .prose-tasks ul li::before{content:'→';color:#D71F26;font-weight:700;flex-shrink:0;margin-top:1px;font-size:15px}

                /* requirements list — › arrow (used in requirements) */
                .prose-req ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}
                .prose-req ul li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#333;line-height:1.5;padding:0}
                .prose-req ul li::before{content:'›';color:#aaa;font-weight:600;flex-shrink:0;margin-top:0;font-size:17px;line-height:1.3}

                .prose strong{font-weight:600}

                /* ── CONDITIONS ── */
                .cond-salary{font-size:22px;font-weight:700;color:#111;margin-bottom:2px}
                .cond-note{font-size:12px;color:#999;margin-bottom:20px}
                .cond-block{margin-bottom:18px}
                .cond-block-lbl{font-size:13px;font-weight:700;color:#111;margin-bottom:8px;display:flex;align-items:center;gap:6px}
                .cond-block-lbl svg{color:#777}
                .bonus-list{list-style:none;display:flex;flex-direction:column;gap:6px}
                .bonus-list li{display:flex;align-items:flex-start;gap:9px;font-size:14px;color:#333}
                .bonus-dot{width:7px;height:7px;background:#D71F26;border-radius:50%;flex-shrink:0;margin-top:5px}
                .perks{display:flex;gap:8px;flex-wrap:wrap}
                .perk{display:inline-block;padding:4px 14px;border-radius:20px;border:1px solid #d4d4d4;font-size:12px;color:#444;background:#f8f8f8}

                /* ── CAREER ── */
                .career-hd{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px}
                .career-note{font-size:12px;color:#999}
                .career-grid{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid #e0e0e0;border-radius:8px;overflow:hidden}
                .career-cell{padding:14px 16px;border-right:1px solid #e0e0e0;background:#fff}
                .career-cell:last-child{border-right:none}
                .career-lvl{font-size:13px;font-weight:700;color:#111;margin-bottom:5px}
                .career-desc{font-size:12px;color:#999;line-height:1.4}

                /* ── STAGES ── */
                .stages{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
                .stage{background:#f6f6f6;border-radius:8px;padding:18px 16px}
                .stage-num{font-size:26px;font-weight:800;color:#D71F26;line-height:1;margin-bottom:8px}
                .stage-ttl{font-size:13px;font-weight:700;color:#111;margin-bottom:5px}
                .stage-dsc{font-size:12px;color:#777;line-height:1.4}

                /* ── DARK CTA ── */
                .dark-cta{background:#161616;border-radius:10px;padding:40px 32px;text-align:center;margin-bottom:32px}
                .dark-cta-ttl{font-size:20px;font-weight:700;color:#fff;margin-bottom:6px}
                .dark-cta-sub{font-size:13px;color:#888;margin-bottom:22px}
                .dark-cta-btn{display:inline-block;background:#D71F26;color:#fff;padding:12px 32px;border-radius:4px;font-size:13px;font-weight:700;text-decoration:none}
                .dark-cta-btn:hover{background:#bb1920}

                /* ── NEWSLETTER ── */
                .newsletter{background:#fff5f5;border-radius:10px;padding:20px 24px;display:flex;align-items:center;gap:16px}
                .nl-ico{font-size:26px;flex-shrink:0}
                .nl-txt{flex:1;font-size:13px;font-weight:500;color:#333}
                .nl-form{display:flex;gap:8px;flex-shrink:0}
                .nl-input{padding:8px 14px;border:1px solid #ddd;border-radius:4px;font-size:13px;width:190px;outline:none;font-family:inherit}
                .nl-input:focus{border-color:#D71F26}
                .nl-btn{background:#D71F26;color:#fff;border:none;padding:8px 18px;border-radius:4px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
                .nl-btn:hover{background:#bb1920}

                @media(max-width:600px){
                    .stats{grid-template-columns:repeat(2,1fr)}
                    .stat:nth-child(3n){border-right:1px solid #e0e0e0}
                    .stat:nth-child(2n){border-right:none}
                    .career-grid{grid-template-columns:repeat(2,1fr)}
                    .career-cell:nth-child(2){border-right:none}
                    .career-cell:nth-child(n+3){border-top:1px solid #e0e0e0}
                    .stages{grid-template-columns:repeat(2,1fr)}
                    .newsletter{flex-direction:column;align-items:flex-start}
                    .nl-form{width:100%}
                    .nl-input{flex:1;width:auto}
                    .red-banner{flex-direction:column;align-items:flex-start}
                }
            `}</style>

            {/* Nav */}
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
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {v.region}
                        </span>
                    )}
                    {v.work_schedule && (
                        <span className="hero-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
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
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
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
        </>
    );
}
