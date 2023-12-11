async function fetchChatsList(id) {
  try {
    const response = await fetch(
      `https://finalprojectserver0-5.onrender.com/api/v1/chats/${id}`
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

export default fetchChatsList;
