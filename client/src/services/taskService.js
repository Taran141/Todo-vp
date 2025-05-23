import api from './api';

// Get all tasks
export const getAllTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

// Get a single task
export const getTask = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};