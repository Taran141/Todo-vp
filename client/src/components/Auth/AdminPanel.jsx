import { useState, useEffect } from 'react';
import axios from 'axios';
 

function AdminPanel() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };
    fetchAllTasks();
  }, []);

  const handleEditClick = (task) => {
    setEditTask(task);
    setTaskTitle(task.title);
    setTaskStatus(task.status);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/admin/tasks/${editTask.id}`,
        { title: taskTitle, status: taskStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(t => t.id === res.data.id ? res.data : t));
      setEditTask(null);
    } catch (err) {
      console.error('Error updating task', err);
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/tasks/${deleteTaskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task.id !== deleteTaskId));
      setDeleteTaskId(null);
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel - All User Tasks</h2>
      {tasks.map(task => (
        <div key={`${task.id}-${task.user_id}`} className="task-item">
          <p><strong>{task.title}</strong> - {task.status}</p>
          <p>User Email: {task.email}</p>
          <p>User ID: {task.user_id}</p>
          <div className="task-buttons">
            <button onClick={() => handleEditClick(task)}>Edit</button>
            <button onClick={() => setDeleteTaskId(task.id)}>Delete</button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <input
                type="text"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              />
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button onClick={() => setEditTask(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTaskId && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button onClick={() => setDeleteTaskId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
