import { PRODUCTION_API_BASE_URL } from './globalVariables';
import { getToken } from '../auth/Token'; 

const update = async (id, username, oldPassword, newPassword, email, phoneNumber) => {
  const userInfo = { username, oldPassword, email, phoneNumber };
  const token = getToken();

  if (newPassword) {
    userInfo.newPassword = newPassword;
  }

  try {
    const result = await fetch(`${PRODUCTION_API_BASE_URL}/user/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
