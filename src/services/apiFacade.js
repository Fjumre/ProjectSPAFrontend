import { PRODUCTION_API_BASE_URL } from "./globalVariables.js";

const login = async (username, password) => {
  const userInfo = { username, password };
  try {
    const result = await fetch(`${PRODUCTION_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    });

    if (!result.ok) {
      throw new Error('Network response was not ok ' + result.status);
    }

    const data = await result.json();
    console.log("Login response data:", data); 
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('userId', data.userId); 
    return data;
  } catch (e) {
    console.error('Failed to fetch: ', e);
    throw e;
  }
};

export default login;
