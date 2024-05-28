import { LOCAL_API_BASE_URL } from "./globalVariables.js";

const login = async (username, password) => {
  const userInfo = { username, password };
  try {
    const result = await fetch(`${LOCAL_API_BASE_URL}/auth/login`, {
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
    localStorage.setItem('authToken', data.token);
    return data;
  } catch (e) {
    console.error('Failed to fetch: ', e);
    throw e;
  }
};

export default login;
