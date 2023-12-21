import axios from "axios";

async function resetPassword({ userType, otp, password, passwordConfirm }) {
  try {
    const response = await axios.patch(
      "https://finalprojectserver0-5.onrender.com/api/v1/students/resetPassword",
      { userType, otp, password, passwordConfirm },
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

export default resetPassword;
