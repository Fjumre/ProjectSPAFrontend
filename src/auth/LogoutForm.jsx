import React from 'react';
import { useNavigate } from 'react-router-dom';
import logout from '../services/Logout';

const LogoutForm = ({ setIsAuthenticated, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUser({ isLoading: false, error: false, user: { username: '', roles: [] } });
    navigate('/login');
  };

  return (
    <div className='centered'>
      <header>
        <button onClick={handleLogout}>Logout</button>
      </header>
    </div>
  );
};

export default LogoutForm;
