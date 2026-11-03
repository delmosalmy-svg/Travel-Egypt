// =====================================
// TRAVEL EGYPT CHATBOT
// =====================================

// 1. Create Chatbot HTML

document.body.insertAdjacentHTML('beforeend', `

<div id="chatbot">

    <button id="chat-toggle">💬</button>

    <div id="chat-window">

        <div id="chat-header">

            <div>
                <strong>Egypt Travel Assistant 🇪🇬</strong>
                <small>Online | How can I help you?</small>
            </div>

            <button id="close-chat">×</button>

        </div>


        <div id="chat-messages">

            <div class="bot-message">
                Hello! Welcome to Travel Egypt 🇪🇬
                How can I help you today?
            </div>

            <div class="quick-questions">

                <button onclick="quickReply('Hotels')">🏨 Hotels</button>

                <button onclick="quickReply('Destinations')">🏛️ Destinations</button>

                <button onclick="quickReply('Book a Trip')">✈️ Book a Trip</button>

<button onclick="quickReply('Offers')">💰 Offers</button>
            </div>

        </div>


        <div id="chat-input-area">

            <input
                type="text"
                id="chat-input"
                placeholder="Type your message..."
            >

            <button id="send-message">➤</button>

        </div>

    </div>

</div>


`);

// =====================================
// 2. CHATBOT DESIGN (CSS)
// =====================================

const chatStyle = document.createElement('style');

chatStyle.textContent = `

#chat-toggle {
position: fixed;
bottom: 25px;
right: 25px;
width: 60px;
height: 60px;
border-radius: 50%;
background: #075b50;
color: white;
border: none;
font-size: 27px;
cursor: pointer;
z-index: 9999;
transition: 0.3s;
}

#chat-toggle:hover {
transform: scale(1.1);
background: #043f38;
}

#chat-window {
display: none;
position: fixed;
bottom: 100px;
right: 25px;
width: 320px;
height: 460px;
background: white;
border-radius: 15px;
box-shadow: 0 5px 25px rgba(0,0,0,0.2);
overflow: hidden;
z-index: 9999;
}

#chat-header {
background: #075b50;
color: white;
padding: 18px;
display: flex;
justify-content: space-between;
align-items: center;
}

#chat-header small {
display: block;
margin-top: 5px;
}

#close-chat {
background: none;
border: none;
color: white;
font-size: 25px;
cursor: pointer;
}

#chat-messages {
height: 325px;
padding: 12px;
overflow-y: auto;
box-sizing: border-box;
}

.bot-message,
.user-message {
padding: 10px;
margin: 10px 0;
border-radius: 10px;
max-width: 85%;
font-size: 14px;
line-height: 1.6;
overflow-wrap: break-word;
}

.bot-message {
background: #e8f3f0;
color: #075b50;
}

.user-message {
background: #075b50;
color: white;
margin-left: auto;
}

.quick-questions {
display: flex;
flex-wrap: wrap;
gap: 8px;
margin: 12px 0;
}

.quick-questions button {
background: white;
border: 1px solid #075b50;
color: #075b50;
padding: 8px 10px;
border-radius: 20px;
cursor: pointer;
transition: 0.3s;
font-size: 12px;
}

.quick-questions button:hover {
background: #075b50;
color: white;
}

#chat-input-area {
display: flex;
padding: 10px;
border-top: 1px solid #eee;
box-sizing: border-box;
}

#chat-input {
flex: 1;
min-width: 0;
padding: 10px;
border: 1px solid #ddd;
border-radius: 8px;
outline: none;
}

#send-message {
background: #075b50;
color: white;
border: none;
padding: 10px 15px;
margin-left: 5px;
border-radius: 8px;
cursor: pointer;
}

#send-message:hover {
background: #043f38;
}

@media (max-width: 400px) {


#chat-window {
    right: 10px;
    width: calc(100% - 20px);
}


}

`;

document.head.appendChild(chatStyle);

// =====================================
// 3. SELECT CHATBOT ELEMENTS
// =====================================

const chatToggle = document.getElementById('chat-toggle');

const chatWindow = document.getElementById('chat-window');

const closeChat = document.getElementById('close-chat');

const chatInput = document.getElementById('chat-input');

const sendButton = document.getElementById('send-message');

const chatMessages = document.getElementById('chat-messages');

// =====================================
// 4. OPEN AND CLOSE CHATBOT
// =====================================

chatToggle.addEventListener('click', function() {

```
chatWindow.style.display = 'block';
```

});

closeChat.addEventListener('click', function() {

```
chatWindow.style.display = 'none';
```

});

// =====================================
// 5. ADD MESSAGE TO CHAT
// =====================================

function addMessage(message, className) {

```
const messageDiv = document.createElement('div');

messageDiv.className = className;

messageDiv.textContent = message;

chatMessages.appendChild(messageDiv);

chatMessages.scrollTop = chatMessages.scrollHeight;
```

}

// =====================================
// 6. BOT REPLIES
// =====================================

function botReply(message) {

```
const text = message.toLowerCase();

let reply = "Thank you for contacting Travel Egypt! How can I help you?";


if (text.includes('hotel')) {

    reply = "We have many hotels in Egypt! Explore our Hotels section to find your perfect stay. 🏨";

}

else if (text.includes('destination')) {

    reply = "Discover amazing destinations in Egypt, including Cairo, Luxor, Aswan and the Red Sea! 🏛️";

}

else if (text.includes('book') || text.includes('trip')) {

    reply = "You can book your trip through our Book Now section. We are happy to help you! ✈️";

}

else if (text.includes('offer')) {

    reply = "Check our Offers section to discover special travel deals! 💰";

}

else if (text.includes('hello') || text.includes('hi')) {

    reply = "Hello! Welcome to Travel Egypt. How can I help you today? 😊";

}

else if (text.includes('thank')) {

    reply = "You're welcome! We hope you enjoy your trip to Egypt! ❤️";

}

addMessage(reply, 'bot-message');
```

}

// =====================================
// 7. SEND MESSAGE
// =====================================

function sendMessage() {

```
const message = chatInput.value.trim();

if (message === '') {

    return;

}

addMessage(message, 'user-message');

chatInput.value = '';

setTimeout(function() {

    botReply(message);

}, 500);
```

}

// =====================================
// 8. QUICK QUESTIONS
// =====================================

function quickReply(message) {

```
addMessage(message, 'user-message');

setTimeout(function() {

    botReply(message);

}, 500);
```

}

// =====================================
// 9. SEND BUTTON
// =====================================

sendButton.addEventListener('click', sendMessage);

// =====================================
// 10. SEND MESSAGE USING ENTER
// =====================================

chatInput.addEventListener('keydown', function(event) {

```
if (event.key === 'Enter') {

    sendMessage();

}
```

});

// =====================================
// END OF CHATBOT
// =====================================
