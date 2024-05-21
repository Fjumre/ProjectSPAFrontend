import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate after login
import login from '../services/apiFacade';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const user = await login(name, password);
      console.log("Login successful", user); // Handle user state post-login
      setIsLoading(false);
      navigate('/home'); // Redirect to home after login
    } catch (e) {
      setError('Login failed: ' + e.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" disabled={isLoading}>Login</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginForm;
