import React, { useState } from 'react';
import doDelete from '../services/doDelete';
import '../landscaping.css';

const DeleteToDo = ({ id, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleted, setDeleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await doDelete(id);
      console.log("Delete successful");
      setDeleted(true);  
      onDelete(id);  // Call the onDelete function passed from the parent
      setIsLoading(false);
    } catch (e) {
      setError('Delete failed: ' + e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className='centered'>
      {deleted ? (
        <div role="alert" className="success-message">To-buy deleted successfully.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <button type="submit" disabled={isLoading}>Delete Product</button>
          {error && <div role="alert" className="error-message">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default DeleteToDo;
