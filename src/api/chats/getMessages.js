async function getMessages(chatId) {
  try {
    const response = await fetch(
      `https://finalprojectserver0-5.onrender.com/api/v1/messages/${chatId}`
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

export default getMessages;
