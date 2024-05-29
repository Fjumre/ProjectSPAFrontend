import {PRODUCTION_API_BASE_URL} from './globalVariables.js';

const updateTo = async (id, title, date, capacity, price, status) => {
  const todoInfo = { title, date, capacity, price, status };

  try {
    const result = await fetch(`${PRODUCTION_API_BASE_URL}/user/list/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoInfo)
    });

    if (!result.ok) {
      throw new Error('Network response was not ok ' + result.status);
    }

    const data = await result.json();
    return data;
  } catch (e) {
    console.error('Failed to update To-Buy: ', e);
    throw e;
  }
};

export default updateTo;
