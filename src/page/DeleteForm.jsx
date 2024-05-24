import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doDelete from '../services/doDelete';
import '../landscaping.css'; 


const DeleteForm = ({ id }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  return (
    <div className='centered'>
    <form onSubmit={handleSubmit}>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button type="submit" disabled={isLoading}>Delete Account</button>
      {error && <div role="alert" className="error-message">{error}</div>}
    </form>
    </div>
  );
};

export default DeleteForm;
