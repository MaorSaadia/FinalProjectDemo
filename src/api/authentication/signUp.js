import axios from "axios";

async function signUp({
  userType,
  name,
  age,
  academic,
  department,
  yearbook,
  gender,
  email,
  password,
  passwordConfirm,
}) {
  try {
    const response = await axios.post(
      "https://finalprojectserver0-5.onrender.com/api/v1/students/signup",
      {
        userType,
        name,
        age,
        academic,
        department,
        yearbook,
        gender,
        email,
        password,
        passwordConfirm,
      },
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

export default signUp;
