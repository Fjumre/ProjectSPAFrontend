import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodaysList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  // Get today's date in 'YYYY-MM-DD' format
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`/api/user/list/${currentDate}`);
        setTodos(response.data);
      } catch (error) {
        setError('Error fetching to buys');
        console.error('Error fetching to buys:', error);
      }
    };

    fetchTodos();
  }, [currentDate]);

  return (
    <div>
      <h1>To-Buys for {currentDate}</h1>
      {error && <p>{error}</p>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodaysList;
