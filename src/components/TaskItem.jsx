// src/components/TaskItem.jsx

export default function TaskItem({ task, onToggle, onDelete }) {
  // 处理切换完成状态
  const handleToggle = () => {
    onToggle(task.id)
  }

  // 处理删除
  const handleDelete = () => {
    onDelete(task.id)
  }

  return (
    <li style={styles.item}>
      <div style={styles.left}>
        {/* 复选框 */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          style={styles.checkbox}
        />
        {/* 任务文字：已完成时加删除线 */}
        <span
          style={{
            ...styles.text,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#999' : '#333',
          }}
        >
          {task.text}
        </span>
      </div>
      
      {/* 删除按钮 */}
      <button onClick={handleDelete} style={styles.deleteButton}>
        删除
      </button>
    </li>
  )
}

// 样式对象
const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    marginBottom: '8px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid #e8e8e8',
    transition: 'all 0.2s',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#4CAF50',
  },
  text: {
    fontSize: '16px',
    wordBreak: 'break-word',
  },
  deleteButton: {
    padding: '4px 12px',
    fontSize: '14px',
    color: '#ff4d4f',
    backgroundColor: 'transparent',
    border: '1px solid #ff4d4f',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
}

// 添加悬停效果（在 index.css 中定义）
// 或者在组件中用 style 无法实现 hover，可以用 CSS 类