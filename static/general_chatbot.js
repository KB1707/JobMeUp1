async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Display user message
    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('p');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send the user's message to the backend (Flask API)
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();

    // Display the AI response
    const botMessage = document.createElement('p');
    botMessage.className = 'bot-message';
    botMessage.textContent = data.reply;
    chatBox.appendChild(botMessage);

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;
}
