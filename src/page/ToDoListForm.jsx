import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateForm from './CreateForm';
import UpdateToDoForm from './UpdateToDoForm';
import DeleteToDo from './DeleteToDo';
import '../landscaping.css';

const ToDoListForm = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);
  const [selectedToDo, setSelectedToDo] = useState(null);
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`/api/user/list/${date || currentDate}`);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching to buys:', error);
      }
    };

    fetchTodos();
  }, [date]);

  const handleAddToDo = (newToDo) => {
    setTodos([...todos, newToDo]);
  };

  const handleUpdateToDo = (todo) => {
    setSelectedToDo(todo);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className='centered'>
      <h1>To buy for {date || currentDate}</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleUpdateToDo(todo)}>Update</button>
            <DeleteToDo id={todo.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
      
      <CreateForm selectedDate={new Date(date || currentDate)} onAddToDo={handleAddToDo} />

      {selectedToDo && (
        <UpdateToDoForm selectedToDo={selectedToDo} />
      )}
    </div>
  );
};

export default ToDoListForm;
