import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateForm from './CreateForm';
import UpdateToDoForm from './UpdateToDoForm';
import DeleteToDo from './DeleteToDo';
import { PRODUCTION_API_BASE_URL } from '../services/globalVariables';
import { getToken } from '../auth/Token';
import '../landscaping.css';

const ToDoListForm = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);
  const [selectedToDo, setSelectedToDo] = useState(null);
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No authorization token found');
        }

        const selectedDate = date || currentDate;
        console.log(`Fetching todos for date: ${selectedDate}`);
        const response = await axios.get(`${PRODUCTION_API_BASE_URL}/user/list/${selectedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("API response: ", response.data);
        if (Array.isArray(response.data)) {
          setTodos(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setTodos([]);
        }
      } catch (error) {
        console.error('Error fetching to-dos:', error.response ? error.response.data : error.message);
        setTodos([]);
      }
    };

    fetchTodos();
  }, [date, currentDate]);

  const handleAddToDo = (newToDo) => {
    console.log('Adding new To-Do:', newToDo);
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newToDo];
      console.log('Updated Todos:', updatedTodos);
      return updatedTodos;
    });
  };

  const handleUpdateToDo = (updatedToDo) => {
    console.log('Updating state with:', updatedToDo);
    setTodos(todos.map(todo => todo.toDoId === updatedToDo.toDoId ? updatedToDo : todo));
    setSelectedToDo(null);
  };

  const handleDelete = (id) => {
    console.log('Deleting To-Do with id:', id);
    setTodos(todos.filter(todo => todo.toDoId !== id));
  };

  return (
    <div className='centered'>
      <h1>To buy for {date || currentDate}</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.toDoId}>
            {console.log(`Rendering To-Do ${index}:`, todo)}
            {todo.title ? (
              <div>
                {todo.title}{" "}
                {todo.capacity}{" "}
                {todo.price}{" "}
                {todo.status}
                <div><button onClick={() => setSelectedToDo(todo)}>Update</button>
                <DeleteToDo id={todo.toDoId} onDelete={handleDelete} /></div>
              </div>
            ) : (
              <div>
                No information available
                <DeleteToDo id={todo.toDoId} onDelete={handleDelete} />
              </div>
            )}
          </li>
        ))}
      </ul>

      <CreateForm selectedDate={new Date(date || currentDate)} onAddToDo={handleAddToDo} />

      {selectedToDo && (
        <UpdateToDoForm selectedToDo={selectedToDo} onUpdateToDo={handleUpdateToDo} />
      )}
    </div>
  );
};

export default ToDoListForm;
