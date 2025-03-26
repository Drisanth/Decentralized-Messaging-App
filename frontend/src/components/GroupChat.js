import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const GroupChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_group_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_group_message");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const data = { text: message, sender: "You" };
      socket.emit("send_group_message", data);
      setMessages((prev) => [...prev, data]);
      setMessage("");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Group Chat</h2>
      <div className="border p-3 mb-3" style={{ height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <div key={index} className="alert alert-secondary">{msg.sender}: {msg.text}</div>
        ))}
      </div>
      <input type="text" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="btn btn-primary mt-2" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default GroupChat;
