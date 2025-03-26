import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const users = {}; // Stores username and socket ID

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Store username when a user joins
    socket.on("set_username", (username) => {
        users[socket.id] = username;
        console.log(`User ${username} connected with ID: ${socket.id}`);
        io.emit("update_users", users); // Update user list
    });

    // Direct Messaging (Fixed)
    socket.on("send_message", ({ receiverId, text }) => {
        const senderName = users[socket.id];

        if (receiverId && users[receiverId]) {
            io.to(receiverId).emit("receive_message", {
                text,
                sender: senderName
            });
            console.log(`Direct Message from ${senderName} to ${users[receiverId]}: ${text}`);
        } else {
            socket.emit("error_message", "User not available");
            console.log("Error: Receiver not found!");
        }
    });

    // Group Chat (Fixed - Prevents Duplicate Messages)
    socket.on("send_group_message", ({ text }) => {
        const senderName = users[socket.id];
        socket.broadcast.emit("receive_group_message", { text, sender: senderName }); // Only broadcast, no self-send
        console.log(`Group Message from ${senderName}: ${text}`);
    });

    // Handle User Disconnection
    socket.on("disconnect", () => {
        console.log(`User ${users[socket.id]} disconnected`);
        delete users[socket.id]; // Remove user from list
        io.emit("update_users", users);
    });
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});