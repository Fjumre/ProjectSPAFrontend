import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register from '../services/Registration';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const user = await register(username, password, email, phoneNumber);
      console.log("Registration successful", user);
      setIsLoading(false);
      navigate('/home');
    } catch (e) {
      setError('Registration failed: ' + e.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Phone Number:
        <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      </label>
      <button type="submit" disabled={isLoading}>Register</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default RegistrationForm;