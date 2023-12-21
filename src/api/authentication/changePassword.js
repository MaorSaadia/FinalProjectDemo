import axios from "axios";

async function changePassword({
  token,
  userType,
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  try {
    const response = await axios.patch(
      "https://finalprojectserver0-5.onrender.com/api/v1/students/updateMyPassword",
      {
        userType,
        passwordCurrent,
        password,
        passwordConfirm,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = response.data;

    if (!response.status === 200) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export default changePassword;
