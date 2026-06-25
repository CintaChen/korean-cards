import { useState } from 'react'
export default function AddWord({ onAdd, onBack }) {
  const [form, setForm] = useState({ ko: '', zh: '', roman: '', pos: '', cat: '', ex: '', exZh: '' })
  const [toast, setToast] = useState('')
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 1800) }
  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.ko.trim() || !form.zh.trim() || !form.pos || !form.cat) { showToast('请填写必填项'); return }
    onAdd({ ko: form.ko.trim(), zh: form.zh.trim(), roman: form.roman.trim(), pos: form.pos, cat: form.cat, ex: form.ex.trim(), exZh: form.exZh.trim() })
    showToast('单词「' + form.ko.trim() + '」已保存 ✓')
    setForm({ ko: '', zh: '', roman: '', pos: '', cat: '', ex: '', exZh: '' })
  }
  const handleClear = () => { setForm({ ko: '', zh: '', roman: '', pos: '', cat: '', ex: '', exZh: '' }); showToast('表单已清空') }
  return (
    <>
      <header className="app-header">
        <button className="back-btn" onClick={onBack} aria-label="返回">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="header-title">添加单词</span>
      </header>
      <main className="app-content">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label><span className="required-mark">*</span> 韩语单词</label>
              <input type="text" value={form.ko} onChange={handleChange("ko")} placeholder="例: 사랑" required />
            </div>
            <div className="form-group">
              <label><span className="required-mark">*</span> 中文意思</label>
              <input type="text" value={form.zh} onChange={handleChange("zh")} placeholder="例: 爱" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>罗马音</label>
              <input type="text" value={form.roman} onChange={handleChange("roman")} placeholder="例: sa-rang" />
            </div>
            <div className="form-group">
              <label><span className="required-mark">*</span> 词性</label>
              <select value={form.pos} onChange={handleChange("pos")} required>
                <option value="">请选择</option>
                <option value="명사">名词</option>
                <option value="동사">动词</option>
                <option value="형용사">形容词</option>
                <option value="부사">副词</option>
                <option value="감탄사">感叹词</option>
              </select>
            </div>
          </div>
          <div className="form-row single">
            <div className="form-group">
              <label><span className="required-mark">*</span> 分类</label>
              <select value={form.cat} onChange={handleChange("cat")} required>
                <option value="">请选择</option>
                <option value="일상">日常</option>
                <option value="TOPIK">TOPIK</option>
                <option value="명사">名词</option>
                <option value="동사">动词</option>
                <option value="형용사">形容词</option>
              </select>
            </div>
          </div>
          <div className="form-row single">
            <div className="form-group">
              <label>例句</label>
              <input type="text" value={form.ex} onChange={handleChange("ex")} placeholder="例: 사랑은 모든 것을 이긴다" />
            </div>
          </div>
          <div className="form-row single">
            <div className="form-group">
              <label>例句翻译</label>
              <input type="text" value={form.exZh} onChange={handleChange("exZh")} placeholder="例: 爱能战胜一切" />
            </div>
          </div>
          <div className="btn-row">
            <button type="button" className="btn btn-secondary" onClick={handleClear}>清空</button>
            <button type="submit" className="btn btn-primary">保存</button>
          </div>
        </form>
      </main>
      {toast && <div className='toast show'>{toast}</div>}
    </>
  )
}
