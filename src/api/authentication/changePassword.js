async function changePassword({
  token,
  userType,
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  try {
    const response = await fetch(
      `https://finalprojectserver0-5.onrender.com/api/v1/students/updateMyPassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userType,
          passwordCurrent,
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

export default changePassword;
