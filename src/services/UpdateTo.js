import { PRODUCTION_API_BASE_URL } from '../services/globalVariables';
import { getToken } from '../auth/Token';

const updateTo = async (toDoId, updatedToDo) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authorization token found');
  }

  try {
    const response = await fetch(`${PRODUCTION_API_BASE_URL}/user/list/update/${toDoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedToDo)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.status);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Failed to update To-Buy: ', e);
    throw e;
  }
};

export default updateTo;
