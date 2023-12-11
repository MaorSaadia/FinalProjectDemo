async function updateStudent({
  userType,
  avatar,
  name,
  age,
  academic,
  department,
  yearbook,
  email,
  token,
}) {
  try {
    const formData = new FormData();

    formData.append("userType", userType);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("academic", academic);
    formData.append("department", department);
    formData.append("yearbook", yearbook);
    formData.append("email", email);

    if (avatar) {
      const localUri = avatar;
      const filename = localUri.split("/").pop();

      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";

      formData.append("avatar", {
        uri: localUri,
        name: filename,
        type,
      });
    }

    const response = await fetch(
      `https://finalprojectserver0-5.onrender.com/api/v1/students/updateMe`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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

export default updateStudent;
