import { useState } from 'react'
import useWords from './hooks/useWords'
import HomePage from './components/HomePage'
import WordList from './components/WordList'
import AddWord from './components/AddWord'
import Review from './components/Review'
import Stats from './components/Stats'

export default function App() {
  const [page, setPage] = useState('home')
  const { words, addWord, deleteWord, updateWord, categories } = useWords()
  const navigate = (p) => setPage(p)
  return (
    <div className="app-frame">
      {page === 'home' && <HomePage words={words} navigate={navigate} />}
      {page === 'wordList' && (
        <WordList
          words={words} categories={categories}
          onDelete={deleteWord}
          onBack={() => navigate('home')} />
      )}
      {page === 'addWord' && (
        <AddWord onAdd={addWord} onBack={() => navigate('home')} />
      )}
      {page === 'review' && (
        <Review words={words} onUpdate={updateWord} onBack={() => navigate('home')} />
      )}
      {page === 'stats' && (
        <Stats words={words} onBack={() => navigate('home')} />
      )}

      <nav className="bottom-nav">
        <button className={page === 'review' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('review')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          复习
        </button>
        <button className={page === 'wordList' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('wordList')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg>
          单词
        </button>
        <button className={page === 'addWord' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('addWord')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          添加
        </button>
        <button className={page === 'stats' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('stats')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="12" width="4" height="8" rx="1"/><rect x="10" y="7" width="4" height="13" rx="1"/><rect x="17" y="2" width="4" height="18" rx="1"/></svg>
          统计
        </button>
      </nav>
    </div>
  )
}
