import { LOCAL_API_BASE_URL } from "./globalVariables.js";

const register = async (name, password, email, phoneNumber) => {
  const userInfo = { name, password, email, phoneNumber };
  try {
    const result = await fetch(`${LOCAL_API_BASE_URL}/auth/register`, {
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
    return data;
  } catch (e) {
    console.error('Failed to fetch: ', e);
    throw e;
  }
};

export default register;
