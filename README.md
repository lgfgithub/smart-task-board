# 智能任务看板

一个基于 React + Vite 构建的任务管理工具，支持任务的增删改查、筛选、搜索和本地数据持久化。

## 在线预览

https://smart-task-board-amber.vercel.app
（国内网络访问可能不稳定，建议直接查看 GitHub 仓库）

## 功能特性

-添加任务
-删除任务
-切换任务完成状态
-筛选（全部 / 进行中 / 已完成）
-搜索任务（实时过滤，不区分大小写）
-任务统计（总数 / 已完成数）
-清空已完成任务
-数据持久化（localStorage）
-性能优化（React.memo + useCallback + useMemo）
-空状态区分（全局无任务 / 筛选后无结果）

## 技术栈

- React 18
- Vite
- React Hooks（useState、useEffect、useMemo、useCallback、自定义 Hook）

## 项目结构
src/
├── components/          ← 组件化思维
│   ├── TaskInput.jsx    ← 受控组件
│   ├── TaskList.jsx     ← 列表渲染
│   └── TaskItem.jsx     ← 性能优化（memo）
├── hooks/               ← 自定义 Hook
│   └── useLocalStorage.js
├── App.jsx              ← 状态管理
└── main.jsx             ← 入口文件

## 本地运行

```bash
npm install
npm run dev
```