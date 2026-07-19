// src/App.jsx
import { useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

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

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }


  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '0 20px' }}>
      <h1>📋 智能任务看板</h1>
      
      {/* 使用 TaskInput 组件，传入 onAdd 函数 */}
      <TaskInput onAdd={addTask} />
      

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App