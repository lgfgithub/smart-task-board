import { memo } from 'react'
import TaskItem from './TaskItem'
export default memo(function TaskList({ tasks, onToggle, onDelete, totalTasks, filter }) {
  // 如果任务列表为空，显示提示信息
  if (totalTasks === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>🎯 还没有任务，添加一个吧！</p>
      </div>
    )
  }

  // 有任务，但当前筛选条件下没有匹配的
  if(tasks.length === 0 ){
    const filterMap = {
      'all': '全部',
      'active': '进行中',
      'completed': '已完成'
    };
    return(
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>
          没有“{filterMap[filter] || '匹配'}”的任务
        </p>
        <p style={{...styles.emptyText, fontStyle: '14px', color: '#bbb'}}>
          试试切换其他筛选条件
        </p>

      </div>
    );
  }

  // 有任务，且当前筛选有结果,正常显示

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
})

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