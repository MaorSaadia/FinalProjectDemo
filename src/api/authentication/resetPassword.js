async function resetPassword({ userType, otp, password, passwordConfirm }) {
  try {
    const response = await fetch(
      `https://finalprojectserver0-5.onrender.com/api/v1/students/resetPassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userType, otp, password, passwordConfirm }),
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

export default resetPassword;
