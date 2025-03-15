import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Chat() {
    const [message, setMessage] = useState("");
    const [cid, setCid] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomId, setRoomId] = useState("");

    const createRoom = async () => {
        await axios.post("http://localhost:3000/create-room", { name: roomName });
        alert("Room created!");
    };

    const joinRoom = async () => {
        await axios.post("http://localhost:3000/join-room", { roomId });
        alert("Joined room!");
    };

    const sendMessage = async () => {
        const res = await axios.post("http://localhost:3000/send-message", { roomId, message });
        setCid(res.data.ipfsHash);
    };

    const getMessages = async () => {
        const res = await axios.get(`http://localhost:3000/get-messages/${roomId}`);
        console.log(res.data);
    };

    return (
        <div className="container mt-4">
            <h2>Decentralized Group Chat</h2>

            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Room Name" onChange={e => setRoomName(e.target.value)} />
                <button className="btn btn-primary mt-2" onClick={createRoom}>Create Room</button>
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Room ID" onChange={e => setRoomId(e.target.value)} />
                <button className="btn btn-success mt-2" onClick={joinRoom}>Join Room</button>
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Type your message..." onChange={e => setMessage(e.target.value)} />
                <button className="btn btn-info mt-2" onClick={sendMessage}>Send</button>
            </div>

            <button className="btn btn-warning mt-2" onClick={getMessages}>Load Messages</button>
        </div>
    );
}

export default Chat;
