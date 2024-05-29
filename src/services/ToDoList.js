import { PRODUCTION_API_BASE_URL } from './globalVariables.js';

const UserDetails = async (date) => {
  try {
    const result = await fetch(`${PRODUCTION_API_BASE_URL}/user/list/${date}`, {
      method: 'GET',
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
    console.error('Failed to fetch to buy details: ', e);
    throw e;
  }
};

export default UserDetails;
