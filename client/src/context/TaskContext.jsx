// client/src/context/TaskContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as taskService from '../services/taskService';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Fetch tasks when component mounts and user is logged in
    const fetchTasks = async () => {
      if (isLoggedIn) {
        try {
          setLoading(true);
          const fetchedTasks = await taskService.getAllTasks();
          setTasks(fetchedTasks);
          setError(null);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch tasks');
          console.error('Error fetching tasks:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTasks();
  }, [isLoggedIn]);

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]);
      return newTask;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
      throw err;
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      return updatedTask;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    }
  };

  const removeTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    }
  };

  const refreshTasks = async () => {
    if (isLoggedIn) {
      try {
        setLoading(true);
        const fetchedTasks = await taskService.getAllTasks();
        setTasks(fetchedTasks);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to refresh tasks');
        console.error('Error refreshing tasks:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        removeTask,
        refreshTasks,
        setError
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};