import TaskItem from './TaskItem'  // 等会我们还要创建 TaskItem

export default function TaskList({ tasks, onToggle, onDelete }) {
  // 如果任务列表为空，显示提示信息
  if (tasks.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>🎯 还没有任务，添加一个吧！</p>
      </div>
    )
  }

  return (
    <ul style={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}          
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

// 简单样式
const styles = {
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    color: '#999',
  },
  emptyText: {
    fontSize: '18px',
    margin: 0,
  },
}