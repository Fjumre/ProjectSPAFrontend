import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import login from '../services/apiFacade';

const LoginForm = () => {
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
      setIsLoading(false);
      const currentDate = new Date().toISOString().split('T')[0];
      navigate(`/calendar/${currentDate}`);
    } catch (e) {
      setError('Login failed: ' + e.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required/>
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
      </label>
      <button type="submit" disabled={isLoading}>Login</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginForm;
