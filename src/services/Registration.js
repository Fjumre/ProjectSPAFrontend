import { PRODUCTION_API_BASE_URL } from './globalVariables.js';

const register = async (username, password, email, phoneNumber) => {
  const userInfo = { username, password, email, phoneNumber };
  try {
    const result = await fetch(`${PRODUCTION_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!result.ok) {
      throw new Error('Network response was not ok ' + result.status);
    }

    const data = await result.json();
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    } else {
      throw new Error('No token received');
    }

    return data;
  } catch (e) {
    console.error('Failed to fetch: ', e);
    throw e;
  }
};

export default register;
