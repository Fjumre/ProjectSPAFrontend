import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ToDoList = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);
  const [newToDo, setNewToDo] = useState('');
  
  useEffect(() => {
    // Fetch todos for the specific date
    axios.get(`/api/list/${date}`).then(response => {
      setTodos(response.data);
    }).catch(error => {
      console.error('Error fetching todos:', error);
    });
  }, [date]);

  const handleAddToDo = () => {
    axios.post(`/api/list`, { date, title: newToDo }).then(response => {
      setTodos([...todos, response.data]);
      setNewToDo('');
    }).catch(error => {
      console.error('Error adding todo:', error);
    });
  };

  return (
    <div>
      <h1>To-Dos for {date}</h1>
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
