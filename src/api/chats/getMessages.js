import axios from "axios";

async function getMessages(chatId) {
  try {
    const response = await axios.get(
      `https://finalprojectserver0-5.onrender.com/api/v1/messages/${chatId}`
    );

    const responseData = response.data;

    if (!response.status === 200) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    throw new Error(err);
  }
}

export default getMessages;
