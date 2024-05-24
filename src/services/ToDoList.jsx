import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ToDoList = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);
  const [newToDo, setNewToDo] = useState('');
  
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`/api/user/list/${date || currentDate}`);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [date]);

  const handleAddToDo = async () => {
    try {
      const response = await axios.post(`/api/user/list`, { date: date || currentDate, title: newToDo });
      setTodos([...todos, response.data]);
      setNewToDo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className='centered'>
      <h1>To-buy for {date || currentDate}</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newToDo}
        onChange={(e) => setNewToDo(e.target.value)}
      />
      <button onClick={handleAddToDo}>Add To-Do</button>
    </div>
  );
};

export default ToDoList;
