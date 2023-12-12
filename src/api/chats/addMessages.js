async function addMessages({ senderId, messageText, chatId }) {
  try {
    const response = await fetch(
      `https://finalprojectserver0-5.onrender.com/api/v1/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId, messageText, chatId }),
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

export default addMessages;
