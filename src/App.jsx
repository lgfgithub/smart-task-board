// src/App.jsx
import { useState } from 'react'
import TaskInput from './components/TaskInput'

function App() {
  const [tasks, setTasks] = useState([])

  // 添加任务函数
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

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '0 20px' }}>
      <h1>📋 智能任务看板</h1>
      
      {/* 使用 TaskInput 组件，传入 onAdd 函数 */}
      <TaskInput onAdd={addTask} />
      
      {/* 显示任务列表（临时） */}
      <div>
        <h3>任务列表（共 {tasks.length} 项）</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App