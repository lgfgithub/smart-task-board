import { useState, useMemo, useCallback } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  // 1.使用自定义Hook实现数据持久化
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // 2.筛选状态
  const [filter, setFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  // 3.添加任务函数
  const addTask = (text) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(), // 用时间戳作为临时 id
        text: text,
        completed: false,
      },
    ])
  }

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  //使用useMemo缓存筛选后的任务列表
  const filteredTasks = useMemo(() => {
    // 1. 先按状态筛选
    let result = tasks;
    if (filter === 'active') {
      result = result.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      result = tasks.filter((task) => task.completed);
    }
    // 2. 再按搜索词筛选
    if (searchText.trim() !== '') {
      const keyword = searchText.toLowerCase().trim();
      result = result.filter((task) => task.text.toLowerCase().includes(keyword));
    }

    return result;
  }, [tasks, filter, searchText]);

  //统计数据
  const total = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;

  //任务已清空
  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }
  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '0 20px' }}>
      <h1>📋 智能任务看板</h1>

      <input type='text' placeholder='搜索任务...' value={searchText} onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: '100%', padding: '10px 14px', marginBottom: '16px', border: '2px solid #ddd',
          borderRadius: '8px', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box'
        }}
        onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      />

      {/* 使用 TaskInput 组件，传入 onAdd 函数 */}
      <TaskInput onAdd={addTask} />

      {/* 筛选按钮 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button onClick={() => setFilter('all')} style={getFilterStyle(filter === 'all')}>全部({total})</button>
        <button onClick={() => setFilter('active')} style={getFilterStyle(filter === 'active')}>进行中 ({total - completedCount})</button>
        <button onClick={() => setFilter('completed')} style={getFilterStyle(filter === 'completed')}>已完成 ({completedCount})</button>
        <button onClick={clearCompleted} style={{ marginLeft: 'auto', padding: '6px 16px', color: 'white', border: 'none', backgroundColor: '#ff4d4f', borderRadius: '20px' }}>清空已完成</button>
      </div>

      <TaskList 
        tasks={filteredTasks}
        onToggle={toggleTask} 
        onDelete={deleteTask} 
        totalTasks={tasks.length} 
        filter={filter}
      />

      {/* 底部统计 */}
      {total > 0 && (
        <div style={{ marginTop: '16px', color: '#888', fontSize: '14px' }}>
          共 {total} 项任务，已完成 {completedCount} 项
        </div>
      )}

    </div>
  );
}

//辅助样式函数
const getFilterStyle = ((active) => ({
  padding: '6px 16px',
  border: '1px solid #ddd',
  borderRadius: '20px',
  backgroundColor: active ? '#4CAF50' : 'transparent',
  color: active ? '#fff' : '#333',
  cursor: 'pointer',
  transition: 'all 0.2s',
}));


export default App