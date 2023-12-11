async function login({ userType, email, password }) {
  try {
    const response = await fetch(
      `https://finalprojectserver0-5.onrender.com/api/v1/students/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userType, email, password }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    throw new Error(err);
  }
}

export default login;
