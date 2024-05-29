import React, { useState, useEffect } from 'react';
import createTo from '../services/CreateTo';
import '../landscaping.css'; 

const CreateForm = ({ selectedDate, onAddToDo }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(selectedDate.toISOString().substr(0, 10));
  const [capacity, setCapacity] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setDate(selectedDate.toISOString().substr(0, 10));
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const newToDo = await createTo(title, date, capacity, price, status);
      console.log('To-Buy created successfully:', newToDo);
      onAddToDo(newToDo);
      setTitle('');
      setCapacity('');
      setPrice('');
      setStatus('');
    } catch (e) {
      setError('Failed to create To-Buy: ' + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className='centered'>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            aria-label="Title"
            required
          />
        </label>
        <label>
          
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            aria-label="Date"
            required
          />
        </label>
        <label>
        
          <input
            type="number"
            placeholder='Capacity'
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
            aria-label="Capacity"
          />
        </label>
        <label>
          
          <input
            type="number"
            step="0.01"
            placeholder='Price'
            value={price}
            onChange={e => setPrice(e.target.value)}
            aria-label="Price"
            required
          />
        </label>
        <label>
         
          <input
            type="text"
            placeholder='Status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            aria-label="Status"
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>Add To Buy</button>
        {error && <div role="alert" className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default CreateForm;
