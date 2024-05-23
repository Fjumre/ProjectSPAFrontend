import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import update from '../services/Update';
import UserDetails from '../services/getUserDetails'; 
import 'landscaping.css'

const UpdateForm = ({ id }) => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await UserDetails(id); 
        setUsername(userDetails.username);
        setEmail(userDetails.email);
        setPhoneNumber(userDetails.phoneNumber);
      } catch (e) {
        setError('Failed to fetch user details: ' + e.message);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (!username || !oldPassword || !email || !phoneNumber) {
      setError('All fields except new password are required');
      setIsLoading(false);
      return;
    }

    if (newPassword && newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const user = await update(id, username, oldPassword, newPassword, email, phoneNumber);
      console.log("Update successful", user);
      setIsLoading(false);
      const currentDate = new Date().toISOString().split('T')[0];
      navigate(`/calendar/${currentDate}`);
    } catch (e) {
      setError('Update failed: ' + e.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          aria-label="Username"
          required
        />
      </label>
      <label>
        Old Password:
        <input
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          aria-label="Old Password"
          required
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          aria-label="New Password"
        />
      </label>
      <label>
        Confirm New Password:
        <input
          type="password"
          value={confirmNewPassword}
          onChange={e => setConfirmNewPassword(e.target.value)}
          aria-label="Confirm New Password"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Email"
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          aria-label="Phone Number"
          required
        />
      </label>
      <button type="submit" disabled={isLoading}>Update</button>
      {error && <div role="alert" className="error-message">{error}</div>}
    </form>
  );
};

export default UpdateForm;
