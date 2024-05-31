import { PRODUCTION_API_BASE_URL } from './globalVariables.js';
import { getToken } from '../auth/Token.jsx';

const Delete = async (id, password) => {
  const token = getToken();
  try {
    const result = await fetch(`${PRODUCTION_API_BASE_URL}/user/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password }) // Send password in the request body
    });

    if (!result.ok) {
      throw new Error('Network response was not ok ' + result.status);
    }

    return true;  
  } catch (e) {
    console.error('Failed to fetch: ', e);
    throw e;
  }
};

export default Delete;
