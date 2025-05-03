import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const { tasks, loading, error, addTask, updateTask, removeTask } = useContext(TaskContext);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const handleFilterChange = e => {
    setFilterStatus(e.target.value);
  };
  
  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus);

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="task-list-container">
      <TaskForm onAddTask={addTask} />
      
      {error && <div className="alert-error">{error}</div>}
      
      <div className="task-filter">
        <label htmlFor="filter">Filter by status: </label>
        <select 
          id="filter" 
          value={filterStatus} 
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          {tasks.length === 0 
            ? 'No tasks yet. Add your first task above!' 
            : 'No tasks match the current filter.'}
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onUpdateTask={updateTask}
              onDeleteTask={removeTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;