import React, { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [editing, setEditing] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { id, title, description, status, created_at } = task;
  
  const statusColor = {
    pending: '#ffc107',       // yellow
    in_progress: '#17a2b8',   // blue
    completed: '#28a745'      // green
  };

  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setDeleteLoading(true);
        await onDeleteTask(id);
      } catch (err) {
        console.error('Error deleting task:', err);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const handleUpdate = async (taskId, taskData) => {
    await onUpdateTask(taskId, taskData);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="task-item editing">
        <TaskForm 
          initialData={task} 
          onUpdateTask={handleUpdate} 
          onCancel={() => setEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className="task-item">
      <div className="task-header">
        <h3>{title}</h3>
        <div 
          className="task-status" 
          style={{ backgroundColor: statusColor[status] }}
        >
          {status.replace('_', ' ')}
        </div>
      </div>
      
      {description && (
        <div className="task-description">
          <p>{description}</p>
        </div>
      )}
      
      <div className="task-footer">
        <span className="task-date">Created: {formatDate(created_at)}</span>
        
        <div className="task-actions">
          <button 
            onClick={() => setEditing(true)}
            className="btn btn-small btn-edit"
          >
            Edit
          </button>
          
          <button 
            onClick={handleDelete}
            className="btn btn-small btn-delete"
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;