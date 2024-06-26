import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import update from '../services/Update';
import UserDetails from '../services/UserDetails';
import '../landscaping.css';
import DeleteForm from './DeleteForm';

const UpdateForm = () => {
  const { id } = useParams();
  console.log("UpdateForm user ID:", id);

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
    if (id) {
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
    } else {
      setError('User ID is not defined');
    }
  }, [id]);

   // Form validation
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

    console.log("Sending update request with data:", { id, username, oldPassword, newPassword, email, phoneNumber });

    try {
      const user = await update(id, username, oldPassword, newPassword, email, phoneNumber);
      console.log("Update successful", user);
      setIsLoading(false);
    
    } catch (e) {
      setError('Update failed: ' + e.message);
      setIsLoading(false);
    }
  };
//

  const handleDelete = async (password) => {
    setIsLoading(true);
    setError('');

    try {
      await doDelete(id, password);
      console.log("Delete successful");
      setIsLoading(false);
      navigate('/home');
    } catch (e) {
      setError('Delete failed: ' + e.message);
      setIsLoading(false);
    }
  };
  
//Form submission with input changes
  return (
    <div className='centeredflex'>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            aria-label="Username"
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder='Old Password'
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            aria-label="Old Password"
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder='New Password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            aria-label="New Password"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder='Confirm New Password'
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            aria-label="Confirm New Password"
          />
        </label>
        <label>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-label="Email"
            required
          />
        </label>
        <label>
          <input
            type="tel"
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            aria-label="Phone Number"
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>Update</button>
        {error && <div role="alert" className="error-message">{error}</div>}
      </form>
      <DeleteForm id={id} onDelete={handleDelete} />
    </div>
  );
};

export default UpdateForm;
