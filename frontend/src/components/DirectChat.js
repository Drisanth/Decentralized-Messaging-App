import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const DirectChat = () => {
    const [username, setUsername] = useState(""); // Actual username (set after "Join")
    const [usernameInput, setUsernameInput] = useState(""); // Temporary input state
    const [userList, setUserList] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("update_users", (users) => {
            setUserList(users);
        });

        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, { sender: data.sender, text: data.text }]);
        });

        return () => {
            socket.off("update_users");
            socket.off("receive_message");
        };
    }, []);

    const handleLogin = () => {
        if (usernameInput.trim()) {
            setUsername(usernameInput); // Set actual username after clicking "Join"
            socket.emit("set_username", usernameInput);
        }
    };

    const handleUserClick = (userId) => {
        setSelectedUser(userId);
        setMessages([]); // Clear chat when switching users
    };

    const sendMessage = () => {
        if (message.trim() && selectedUser) {
            socket.emit("send_message", { receiverId: selectedUser, text: message });
            setMessages((prev) => [...prev, { sender: "You", text: message }]);
            setMessage("");
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar for Active Users */}
            <div style={{ width: "25%", background: "#2C3E50", color: "white", padding: "20px" }}>
                <h3>Active Users</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {Object.entries(userList).map(([id, name]) => (
                        <li 
                            key={id} 
                            onClick={() => handleUserClick(id)} 
                            style={{ 
                                cursor: "pointer", 
                                padding: "10px", 
                                background: selectedUser === id ? "#1ABC9C" : "transparent" 
                            }}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Section */}
            <div style={{ width: "75%", padding: "20px", background: "#ECF0F1" }}>
                {!username ? (
                    <div>
                        <h2>Enter Username:</h2>
                        <input 
                            type="text" 
                            value={usernameInput} 
                            onChange={(e) => setUsernameInput(e.target.value)} 
                        />
                        <button onClick={handleLogin}>Join</button>
                    </div>
                ) : (
                    <>
                        {selectedUser ? (
                            <>
                                <h2>Chat with {userList[selectedUser]}</h2>
                                <div style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
                                    {messages.map((msg, index) => (
                                        <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
                                    ))}
                                </div>
                                <input 
<<<<<<< HEAD
                                    type="text" 
=======
                                    type="text"
>>>>>>> 8799ede (Fixed Input field disappearing in DirectChat)
                                    value={message} 
                                    onChange={(e) => setMessage(e.target.value)} 
                                    placeholder="Type your message..." 
                                />
                                <button onClick={sendMessage}>Send</button>
                            </>
                        ) : (
                            <h2>Select a user to chat</h2>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default DirectChat;
