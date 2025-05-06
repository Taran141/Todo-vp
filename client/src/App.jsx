import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Regsiter.jsx';
import TaskList from './components/Tasks/TaskList.jsx';
import PrivateRoute from './components/Common/PrivateRoute.jsx';
import AdminPanel from './components/Auth/AdminPanel.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <div className="container">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminPanel />} />

                <Route 
                  path="/" 
                  element={
                    <PrivateRoute>
                      <TaskProvider>
                        <TaskList />
                      </TaskProvider>
                    </PrivateRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
