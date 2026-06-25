# 韩语单词卡 🇰🇷

一个基于间隔复述（Spaced Repetition）的韩语词汇学习 Web 应用，支持单词管理、复习、统计等完整学习闭环。

## ✨ 功能

- **📖 今日复习** — 基于间隔复述算法，智能安排待复习单词
- **📝 单词列表** — 查看、搜索、按分类筛选全部单词
- **➕ 添加单词** — 录入新词，支持韩文、发音、中文释义、例句
- **📊 学习统计** — 掌握进度、各分类数据可视化追踪
- **🏷 分类标签** — 日常用语、饮食、TOPIK 等分类管理
- **🌓 纯净 UI** — 轻量现代设计，专注学习体验

## 🚀 快速开始

项目包含两种形式：

### 1️⃣ 纯静态 HTML 版本

直接用浏览器打开根目录下的 `index.html` 即可使用。

### 2️⃣ Vite + React 版本

```bash
cd korean-cards
npm install
npm run dev
```

开发服务器默认在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
cd korean-cards
npm run build
```

构建产物输出到 `korean-cards/dist/`。

## 🗂 项目结构

```
├── index.html                 # 静态版入口页
├── review.html                # 复习页
├── word-list.html             # 单词列表页
├── add-word.html              # 添加单词页
├── stats.html                 # 统计页
│
└── korean-cards/              # React 应用
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx           # 应用入口
        ├── App.jsx            # 根组件 + 路由
        ├── App.css            # 全局样式
        ├── components/
        │   ├── HomePage.jsx   # 首页
        │   ├── Review.jsx     # 复习模块
        │   ├── WordList.jsx   # 单词列表
        │   ├── AddWord.jsx    # 添加单词
        │   └── Stats.jsx      # 统计页面
        ├── hooks/
        │   └── useWords.js    # 单词数据管理 Hook
        └── data/
            └── defaultWords.js # 初始词库
```

## 🧠 间隔复述

采用类似 SuperMemo / Anki 的间隔复述策略：

- **New** — 新学单词，需要初次记忆
- **Learning** — 学习中，按递增间隔安排复习
- **Mastered** — 已掌握，进入长期巩固周期

每次复习后系统自动计算下一次复习时间，让记忆效率最大化。

## 🛠 技术栈

- **Vite** — 构建工具
- **React** — UI 框架
- **纯 CSS** — 无第三方 UI 库，轻量自研样式
- **localStorage** — 本地持久化存储

## 📄 许可

MIT
