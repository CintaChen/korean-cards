import { useState, useMemo, useCallback } from 'react'
function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
export default function Review({ words, onUpdate, onBack }) {
  const reviewWords = useMemo(() => shuffle(words).slice(0, Math.min(words.length, 20)), [words])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [reviewed, setReviewed] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [toast, setToast] = useState('')
  const [done, setDone] = useState(false)
  const showToast = useCallback((msg) => { setToast(msg); setTimeout(() => setToast(''), 1400) }, [])
  const total = reviewWords.length
  const currentWord = reviewWords[currentIdx] || null
  const flipCard = () => setIsFlipped(v => !v)
  const answer = (type) => {
    if (!currentWord) return
    const newStatus = type === 'mastered' ? 'mastered' : 'learning'
    onUpdate(currentWord.id, { status: newStatus, reviewedAt: new Date().toISOString().slice(0, 10), reviewCount: (currentWord.reviewCount || 0) + 1 })
    const newReviewed = reviewed + 1
    setReviewed(newReviewed)
    const labels = { 'dont-know': '不会', 'fuzzy': '模糊', 'mastered': '已掌握' }
    showToast(labels[type] + ' · ' + newReviewed + '/' + total)
    if (currentIdx + 1 >= total) { setDone(true); return }
    setCurrentIdx(prev => prev + 1); setIsFlipped(false)
  }
  const restart = () => { setCurrentIdx(0); setReviewed(0); setIsFlipped(false); setDone(false); showToast('本轮复习完成！重新开始 ✨') }
  if (done) {
    return (
      <>
        <header className="app-header">
          <button className="back-btn" onClick={onBack} aria-label="返回">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span className="header-title">今日复习</span>
        </header>
        <main className="app-content" style={{ justifyContent: "center", alignItems: "center", textAlign: "center", gap: 20 }}>
          <div className="hero-icon" style={{ width: 72, height: 72, borderRadius: 22 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 620 }}>本轮复习完成！</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>已复习 {reviewed} / {total} 个单词</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button className="btn btn-secondary" onClick={onBack}>返回首页</button>
            <button className="btn btn-primary" onClick={restart}>再来一轮</button>
          </div>
        </main>
      </>
    )
  }
  if (!currentWord) {
    return (
      <>
        <header className="app-header">
          <button className="back-btn" onClick={onBack} aria-label="返回"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg></button>
          <span className="header-title">今日复习</span>
        </header>
        <main className="app-content" style={{ justifyContent: "center", alignItems: "center" }}>
          <div className="empty-state">暂无单词可复习</div>
        </main>
      </>
    )
  }
  const pct = total > 0 ? Math.round((reviewed / total) * 100) : 0
  return (
    <>
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="back-btn" onClick={onBack} aria-label="返回"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg></button>
          <span className="header-title">今日复习</span>
        </div>
      </header>
      <main className="app-content">
        <section className="progress-section">
          <div className="progress-header">
            <span className="progress-label">今日复习进度</span>
            <span className="progress-count"><span>{reviewed}</span> / <span>{total}</span></span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: pct + "%" }}></div></div>
        </section>
        <div className="card-stage">
          <div className={'flashcard' + (isFlipped ? ' flipped' : '')} onClick={flipCard}>
            <div className="card-face card-front">
              <span className="card-pos">{currentWord.pos} · {currentWord.cat}</span>
              <span className="card-word">{currentWord.ko}</span>
              <span className="card-roman">{currentWord.roman}</span>
              <span className="card-hint">点击翻转查看释义</span>
            </div>
            <div className="card-face card-back">
              <span className="card-meaning">{currentWord.zh}</span>
              {currentWord.ex && (
                <div className="card-example">
                  {currentWord.ex}
                  {currentWord.exZh && <em>{currentWord.exZh}</em>}
                </div>
              )}
              <span className="card-hint">再次点击翻回</span>
            </div>
          </div>
        </div>
        <div className="actions-row">
          <button className='action-btn dont-know' onClick={() => answer('dont-know')}>
            <span className="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
            不会
          </button>
          <button className='action-btn fuzzy' onClick={() => answer('fuzzy')}>
            <span className="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><line x1="8" y1="12" x2="16" y2="12"/></svg></span>
            模糊
          </button>
          <button className='action-btn mastered' onClick={() => answer('mastered')}>
            <span className="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            已掌握
          </button>
        </div>
      </main>
      {toast && <div className='toast show'>{toast}</div>}
    </>
  )
}
