import axios from "axios";

async function fetchStudents(context) {
  try {
    const response = await axios.get(
      `https://finalprojectserver0-5.onrender.com/api/v1/students/${context.id}`
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

export default fetchStudents;
