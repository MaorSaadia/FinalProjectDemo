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
    const response = await fetch(
      `https://finalprojectserver0-5.onrender.com/api/v1/students/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
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

export default signUp;
