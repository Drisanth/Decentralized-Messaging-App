import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { generateGroupId } from '../utility/groupUtils';

const GroupChat = ({ selectedGroupName }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  const groupId = generateGroupId(selectedGroupName);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-messages/${groupId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (selectedGroupName) {
      fetchMessages();
    }
  }, [selectedGroupName]);

  const handleSendMessage = async () => {
    if (!messageText) return;

    const payload = {
      groupId,
      content: messageText,
      expiry: Math.floor(Date.now() / 1000) + 3600 // expire after 1 hour
    };

    try {
      await axios.post('http://localhost:3000/send-message', payload);
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="group-chat-container">
      <h2>Group Chat: {selectedGroupName}</h2>
      <p style={{ fontSize: '0.8em' }}>Group ID: {groupId}</p>

      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            <p><strong>{msg.sender}</strong>: {msg.content}</p>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default GroupChat;
