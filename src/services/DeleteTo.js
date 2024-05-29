import { PRODUCTION_API_BASE_URL } from './globalVariables.js';

const doDelete = async (id) => {
  try {
    const result = await fetch(`${PRODUCTION_API_BASE_URL}/user/list/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!result.ok) {
      throw new Error('Network response was not ok ' + result.status);
    }

    const data = await result.json();
    return data;
  } catch (e) {
    console.error('Failed to delete To-Buy: ', e);
    throw e;
  }
};

export default doDelete;
