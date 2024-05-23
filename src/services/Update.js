import { LOCAL_API_BASE_URL } from './globalVariables.js';

const update = async (id, username, oldPassword, newPassword, email, phoneNumber) => {
  const userInfo = { username, oldPassword, email, phoneNumber };

  if (newPassword) {
    userInfo.newPassword = newPassword;
  }

  try {
    const result = await fetch(`${LOCAL_API_BASE_URL}/user/update/${id}`, {
      method: 'PUT',
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

export default update;
