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

    return true;  
  } catch (e) {
    console.error('Failed to fetch: ', e);
    window.alert('Failed to delete item. Please try again later.');
    throw e; // Re-throw the error to propagate it further if needed
  }
};

export default doDelete;
