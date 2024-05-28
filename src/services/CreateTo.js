import { LOCAL_API_BASE_URL } from './globalVariables.js';
import { getToken } from '../auth/Token.jsx';

const createTo = async (title, date, capacity, price, status) => {
  const todoInfo = { title, date, capacity, price, status };
  const token = getToken();  
  
  if (!token) {
    throw new Error('No authorization token found');
  }

  try {
    const result = await fetch(`${LOCAL_API_BASE_URL}/user/list/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(todoInfo)
    });

    if (!result.ok) {
      throw new Error('Network response was not ok ' + result.status);
    }

    const data = await result.json();
    return data;
  } catch (e) {
    console.error('Failed to fetch: ', e);
    throw e;
  }
};

export default createTo;
