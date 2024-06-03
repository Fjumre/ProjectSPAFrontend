import { PRODUCTION_API_BASE_URL } from './globalVariables';
import { getToken } from '../auth/Token'; 

const UserDetails = async (id) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authorization token found');
  }
  
  try {
    const result = await fetch(`${PRODUCTION_API_BASE_URL}/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const textResult = await result.text();
    console.log('Raw response:', textResult);

    if (!result.ok) {
      throw new Error('Network response was not ok ' + result.status);
    }

    const data = JSON.parse(textResult);
    console.log('Parsed response:', data);
    return data;
  } catch (e) {
    console.error('Failed to fetch user details: ', e);
    throw e;
  }
};

export default UserDetails;
