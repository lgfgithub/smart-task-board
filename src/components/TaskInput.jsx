import { useState } from 'react'

export default function TaskInput({ onAdd }) {
  // 1. 声明状态：管理输入框的内容
  const [input, setInput] = useState('')

  // 2. 处理输入变化
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  // 3. 处理提交
  const handleSubmit = (e) => {
    e.preventDefault() // 阻止页面刷新
    
    // 如果输入为空或只有空格，不添加
    if (input.trim() === '') {
      alert('请输入任务内容！')
      return
    }
    
    // 调用父组件传过来的 onAdd 函数
    onAdd(input.trim())
    
    // 清空输入框
    setInput('')
  }

  // 4. 返回 JSX
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="请输入任务..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        添加任务
      </button>
    </form>
  )
}

// 5. 样式对象（简单内联样式）
const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px 15px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px 24px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
}

// 输入框获得焦点时边框变色（需要在全局样式或 CSS 中实现）
// 这里可以加个简单的 CSS-in-JS 方案，但为了简洁，我们在 App.jsx 中导入样式