import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as authService from '../../services/authService';

const Header = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Todo App</Link>
        </div>
        
        <nav className="nav">
          {isLoggedIn ? (
            <>
              <span className="welcome-message">
                Welcome, {user?.username || 'User'}
              </span>
              <button 
                onClick={handleLogout} 
                className="btn btn-small btn-outline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;