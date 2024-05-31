import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../services/apiFacade';
import '../landscaping.css';

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const user = await login(username, password);
      console.log("Login successful", user);
      setIsAuthenticated(true);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.userId); // Store userId
      setIsLoading(false);
      const currentDate = new Date().toISOString().split('T')[0];
      navigate(`/calendar/${currentDate}`);
    } catch (e) {
      setError('Login failed: ' + e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className='backgroundregistration'>
      <div className='centered'>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required />
          </label>
          <label>
            <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <button type="submit" disabled={isLoading}>Login</button>
          {error && <div role="alert" className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;