export default function HomePage({ words, navigate }) {
  const masteredCount = words.filter(w => w.status === 'mastered').length
  const dueCount = words.filter(w => w.status !== 'mastered').length
  return (
    <>
      <header className="app-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg viewBox="0 0 32 32" fill="none" width="32" height="32"><rect width="32" height="32" rx="10" fill="oklch(85% 0.06 12 / 0.30)"/><text x="16" y="22" textAnchor="middle" fontSize="17" fontWeight="700" fill="oklch(62% 0.14 12)">韩</text></svg>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 620, letterSpacing: "-0.01em" }}>韩语单词卡</h1>
        </div>
      </header>
      <main className="app-content">
        <section className="hero">
          <div className="hero-icon">
            <svg viewBox="0 0 32 32" fill="none"><rect x="2" y="4" width="28" height="24" rx="4" stroke="oklch(62% 0.14 12)" strokeWidth="1.8" fill="none"/><line x1="2" y1="12" x2="30" y2="12" stroke="oklch(62% 0.14 12)" strokeWidth="1.2" opacity="0.4"/><line x1="10" y1="16" x2="22" y2="16" stroke="oklch(62% 0.14 12)" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </div>
          <h2>每天一点，轻松学韩语</h2>
          <p>翻转记忆卡片，用间隔复述法高效积累韩语词汇</p>
          <span className="streak-badge"><span className="dot"></span>共 {words.length} 个单词</span>
        </section>
        <nav className="nav-grid">
          <button className='nav-card' onClick={() => navigate('review')}>
            <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
            <h3>今日复习</h3>
            <p>{dueCount} 个单词待复习</p>
          </button>
          <button className='nav-card' onClick={() => navigate('wordList')}>
            <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg></div>
            <h3>单词列表</h3>
            <p>搜索 · 分类筛选</p>
          </button>
          <button className='nav-card' onClick={() => navigate('addWord')}>
            <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div>
            <h3>添加单词</h3>
            <p>录入新词 · 丰富词库</p>
          </button>
          <button className='nav-card' onClick={() => navigate('stats')}>
            <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="12" width="4" height="8" rx="1"/><rect x="10" y="7" width="4" height="13" rx="1"/><rect x="17" y="2" width="4" height="18" rx="1"/></svg></div>
            <h3>学习统计</h3>
            <p>进度追踪 · 分类数据</p>
          </button>
        </nav>
      </main>
      <footer style={{ textAlign: "center", padding: "8px 20px 20px", fontSize: 12, color: "var(--muted)", flexShrink: 0 }}>
        已掌握 {masteredCount} 个单词，继续加油！
      </footer>
    </>
  )
}
