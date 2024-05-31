import React, { useState } from 'react';
import updateTo from '../services/UpdateTo';

const UpdateToDoForm = ({ selectedToDo, onUpdateToDo }) => {
  const [title, setTitle] = useState(selectedToDo.title);
  const [date, setDate] = useState(selectedToDo.date);
  const [capacity, setCapacity] = useState(selectedToDo.capacity);
  const [price, setPrice] = useState(selectedToDo.price);
  const [status, setStatus] = useState(selectedToDo.status);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedToDo = {
      toDoId: selectedToDo.toDoId,
      title,
      date,
      capacity,
      price,
      status
    };

    console.log('Updating to-do:', updatedToDo);

    try {
      const result = await updateTo(updatedToDo.toDoId, updatedToDo);
      console.log('Update result:', result);
      onUpdateToDo(result);
    } catch (e) {
      console.error('Failed to update to-do:', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateToDoForm;
