import { useMemo } from 'react'
export default function Stats({ words, onBack }) {
  const stats = useMemo(() => {
    const total = words.length
    const mastered = words.filter(w => w.status === 'mastered').length
    const needReview = total - mastered
    const pct = total > 0 ? Math.round((mastered / total) * 100) : 0
    const catMap = {}
    words.forEach(w => { if (!catMap[w.cat]) catMap[w.cat] = { total: 0, mastered: 0 }; catMap[w.cat].total++; if (w.status === 'mastered') catMap[w.cat].mastered++ })
    const catStats = Object.entries(catMap).map(([cat, data]) => ({ cat, total: data.total, mastered: data.mastered, pct: data.total > 0 ? Math.round((data.mastered / data.total) * 100) : 0 }))
    const reviewDates = new Set(words.filter(w => w.reviewedAt).map(w => w.reviewedAt))
    const streak = Math.min(reviewDates.size, 30)
    return { total, mastered, needReview, pct, catStats, streak }
  }, [words])
  const colors = ['var(--accent)', 'var(--accent-blue)', 'var(--success)', 'var(--warn)', 'oklch(58% 0.12 290)', 'oklch(62% 0.14 12)']
  return (
    <>
      <header className="app-header">
        <button className="back-btn" onClick={onBack} aria-label="返回">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="header-title">学习统计</span>
      </header>
      <main className="app-content">
        <div className="stat-cards">
          <div className="stat-card">
            <span className="stat-num total">{stats.total}</span>
            <span className="stat-label">总单词数</span>
          </div>
          <div className="stat-card">
            <span className="stat-num mastered">{stats.mastered}</span>
            <span className="stat-label">已掌握</span>
          </div>
          <div className="stat-card">
            <span className="stat-num review">{stats.needReview}</span>
            <span className="stat-label">需复习</span>
          </div>
        </div>
        <section className="progress-card">
          <div className="section-title">整体掌握进度</div>
          <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: stats.pct + "%" }}></div></div>
          <div className="progress-meta"><span>已掌握 {stats.pct}%</span><span>目标 80%</span></div>
        </section>
        <section className="cat-card">
          <div className="section-title">分类学习情况</div>
          {stats.catStats.length === 0 ? (<div className='empty-state'>暂无数据</div>) : (
            stats.catStats.map((item, i) => (
              <div className='cat-row' key={item.cat}>
                <span className='cat-name'>{item.cat}</span>
                <div className='cat-bar-wrap'><div className='cat-bar-fill' style={{ width: item.pct + '%', background: colors[i % colors.length] }}></div></div>
                <span className='cat-count'>{item.mastered}/{item.total}</span>
              </div>
            ))
          )}
        </section>
        <section className="streak-card">
          <div className="streak-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div className="streak-info">
            <div className="streak-label">学习天数</div>
            <div className="streak-value">{stats.streak} 天</div>
          </div>
        </section>
      </main>
    </>
  )
}
