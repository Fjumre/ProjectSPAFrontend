import { LOCAL_API_BASE_URL } from './globalVariables.js';

const doDelete = async (id, username, password, email, phoneNumber) => {
  const userInfo = { username, password, email, phoneNumber };
  try {
    const result = await fetch(`${LOCAL_API_BASE_URL}/user/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
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

export default doDelete;
