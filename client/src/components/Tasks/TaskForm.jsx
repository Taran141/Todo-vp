import React, { useState } from 'react';

const TaskForm = ({ onAddTask, initialData = null, onUpdateTask = null, onCancel = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { title, description, status } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      if (initialData && onUpdateTask) {
        await onUpdateTask(initialData.id, formData);
        if (onCancel) onCancel();
      } else {
        await onAddTask(formData);
        setFormData({
          title: '',
          description: '',
          status: 'pending'
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form">
      <h2>{initialData ? 'Edit Task' : 'Add New Task'}</h2>
      
      {error && <div className="alert-error">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={onChange}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : initialData ? 'Update Task' : 'Add Task'}
          </button>
          
          {initialData && onCancel && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;