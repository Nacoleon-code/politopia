// Script to handle Debate page functionalities

document.addEventListener('DOMContentLoaded', () => {
    const endDebateButton = document.getElementById('end-debate-button');
    const overlay = document.getElementById('overlay');
    const stayButton = document.getElementById('stay-button');
    const exitButton = document.getElementById('exit-button');
    const sendButton = document.getElementById('send-button');
    const typingBox = document.getElementById('typing-box');
    const chatHistory = document.getElementById('chat-history');


    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = event.data;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to latest message
    };

    ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    // Show the verification dialog when the "END DEBATE" button is clicked
    endDebateButton.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    // Handle "STAY" button click - close the verification dialog
    stayButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Handle "EXIT" button click - redirect to homepage
    exitButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Change this if your homepage URL is different
    });

    // Handle sending chat messages
    sendButton.addEventListener('click', sendMessage);
    typingBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = typingBox.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatHistory.appendChild(messageElement);
            ws.send(message);
            typingBox.value = '';
            chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to latest message
        }
    }
});
