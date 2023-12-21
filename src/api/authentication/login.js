import axios from "axios";

async function login({ userType, email, password }) {
  try {
    const response = await axios.post(
      "https://finalprojectserver0-5.onrender.com/api/v1/students/login",
      { userType, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response.data;

    if (response.status !== 200) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export default login;
