import React, { useState } from 'react';
import updateTo from '../services/UpdateTo';
import '../landscaping.css'; 

const UpdateToDoForm = ({ selectedToDo }) => {
  const [title, setTitle] = useState(selectedToDo.title);
  const [date, setDate] = useState(selectedToDo.date);
  const [capacity, setCapacity] = useState(selectedToDo.capacity);
  const [price, setPrice] = useState(selectedToDo.price);
  const [status, setStatus] = useState(selectedToDo.status);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [updated, setUpdated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setUpdated(false);

    try {
      const updatedToDo = await updateTo(selectedToDo.id, title, date, capacity, price, status);
      console.log('To Buy updated successfully:', updatedToDo);
      setUpdated(true);
    } catch (e) {
      setError('Failed to update To Buy: ' + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='centered'>
      {updated ? (
        <div role="alert" className="success-message">To Buy updated successfully.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              aria-label="Title"
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              aria-label="Date"
              required
            />
          </label>
          <label>
            Capacity:
            <input
              type="number"
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              aria-label="Capacity"
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              aria-label="Price"
              required
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              value={status}
              onChange={e => setStatus(e.target.value)}
              aria-label="Status"
              required
            />
          </label>
          <button type="submit" disabled={isLoading}>Update To Buy</button>
          {error && <div role="alert" className="error-message">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default UpdateToDoForm;
