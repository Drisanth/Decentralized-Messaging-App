import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { generateGroupId } from '../utility/groupUtils';


const Chat = ({ groupName }) => {
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
  
    const groupId = generateGroupId(groupName);
  
    const fetchChat = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-messages/${groupId}`);
        setChatHistory(response.data);
      } catch (error) {
        console.error('Error loading chat:', error);
      }
    };
  
    useEffect(() => {
      if (groupName) {
        fetchChat();
      }
    }, [groupName]);
  
    const sendChatMessage = async () => {
      if (!inputText) return;
  
      const payload = {
        groupId,
        content: inputText,
        expiry: Math.floor(Date.now() / 1000) + 600 // expire after 10 mins
      };
  
      try {
        await axios.post('http://localhost:3000/send-message', payload);
        setInputText('');
        fetchChat();
      } catch (error) {
        console.error('Error sending chat message:', error);
      }
    };
  
    return (
      <div className="chat-box">
        <h2>Chat Room: {groupName}</h2>
        <div className="chat-log">
          {chatHistory.map((chat, i) => (
            <div key={i} className="chat-message">
              <p><strong>{chat.sender}</strong>: {chat.content}</p>
            </div>
          ))}
        </div>
  
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write something..."
        />
        <button onClick={sendChatMessage}>Send</button>
      </div>
    );
  };
  
  export default Chat;