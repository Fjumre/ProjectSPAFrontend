import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register from '../services/Registration';
import '../landscaping.css'; 

const RegistrationForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const user = await register(username, password, email, phoneNumber);
      console.log("Registration successful", user);
      setIsAuthenticated(true);
      setIsLoading(false);
      const currentDate = new Date().toISOString().split('T')[0];
      navigate(`/calendar/${currentDate}`);
    } catch (e) {
      setError('Registration failed: ' + e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className='backgroundregistration'>
      <div className='centered'>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required disabled={isLoading} />
          </label>
          <label>
            <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required disabled={isLoading} />
          </label>
          <label>
            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required disabled={isLoading} />
          </label>
          <label>
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required disabled={isLoading} />
          </label>
          <label>
            <input type="tel" placeholder='Phone Number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required disabled={isLoading} />
          </label>
          <button type="submit" disabled={isLoading}>Register</button>
          {error && <div role="alert" className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;