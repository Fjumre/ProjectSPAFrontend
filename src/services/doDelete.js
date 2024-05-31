import { PRODUCTION_API_BASE_URL } from './globalVariables';
import { getToken } from '../auth/Token';

const doDelete = async (id) => {
  const token = getToken();
  try {
    const result = await fetch(`${PRODUCTION_API_BASE_URL}/user/list/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
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

export default doDelete;
