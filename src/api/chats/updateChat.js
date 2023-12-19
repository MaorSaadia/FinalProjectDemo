async function updateChat({ messageText: lastMessage, chatId }) {
  if (!lastMessage) {
    lastMessage = "תמונה";
  }

  try {
    const response = await fetch(
      `https://finalprojectserver0-5.onrender.com/api/v1/chats/update/${chatId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lastMessage }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (err) {
    console.log(err.message);
    throw new Error(err);
  }
}

export default updateChat;
