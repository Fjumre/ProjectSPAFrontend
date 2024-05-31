import React from 'react';
import axios from 'axios';
import { PRODUCTION_API_BASE_URL } from '../services/globalVariables';
import { getToken } from '../auth/Token';

const DeleteToDo = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authorization token found');
      }

      const response = await axios.delete(`${PRODUCTION_API_BASE_URL}/user/list/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        console.log('Delete successful:', id);
        onDelete(id);
      } else {
        console.error('Delete failed: Unexpected status', response.status);
      }
    } catch (error) {
      console.error('Error deleting to-do:', error.response ? error.response.data : error.message);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteToDo;
