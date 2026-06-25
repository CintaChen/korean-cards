import { useState, useMemo } from 'react'

const STATUS_MAP = { mastered: '\u5DF2\u638C\u63E1', learning: '\u5B66\u4E60\u4E2D', new: '\u65B0\u6DFB\u52A0' }

export default function WordList({ words, categories, onDelete, onBack }) {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('\u5168\u90E8')

  const filtered = useMemo(() => {
    let result = words
    if (activeCat !== '\u5168\u90E8') {
      result = result.filter(w => w.cat === activeCat)
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(w =>
        w.ko.toLowerCase().includes(q) ||
        w.zh.toLowerCase().includes(q) ||
        w.roman.toLowerCase().includes(q)
      )
    }
    return result
  }, [words, activeCat, search])

  return (
    <>
      <header className='app-header'>
        <button className='back-btn' onClick={onBack} aria-label='\u8FD4\u56DE'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round'><polyline points='15 18 9 12 15 6' /></svg>
        </button>
        <span className='header-title'>\u5355\u8BCD\u5217\u8868</span>
        <span className='header-count'>\u5171 {filtered.length} \u8BCD</span>
      </header>

      <main className='app-content'>
        <div className='search-wrap'>
          <div className='search-box'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'><circle cx='11' cy='11' r='8' /><line x1='21' y1='21' x2='16.65' y2='16.65' /></svg>
            <input type='text' placeholder='\u641C\u7D22\u97E9\u8BED\u6216\u4E2D\u6587...' value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className='filter-row'>
          <button className={'chip' + (activeCat === '\u5168\u90E8' ? ' active' : '')} onClick={() => setActiveCat('\u5168\u90E8')}>\u5168\u90E8</button>
          {categories.map(cat => (
            <button key={cat} className={'chip' + (activeCat === cat ? ' active' : '')} onClick={() => setActiveCat(cat)}>{cat}</button>
          ))}
        </div>

        <div className='word-list'>
          {filtered.length === 0 ? (
            <div className='empty-state'>\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u5355\u8BCD</div>
          ) : (
            filtered.map(w => (
              <div className='word-item' key={w.id}>
                <span className='word-ko'>{w.ko}</span>
                <div className='word-info'>
                  <div className='word-zh'>{w.zh}</div>
                  <div className='word-roman'>{w.roman}</div>
                </div>
                <span className={'status-badge ' + w.status}>{STATUS_MAP[w.status]}</span>
                <button className='delete-btn' onClick={() => onDelete(w.id)} title='\u5220\u9664'>
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></svg>
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  )
}
