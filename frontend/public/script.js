document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("username")) {
        document.getElementById("authSection").classList.add("d-none");
        document.getElementById("chatSection").classList.remove("d-none");
        document.getElementById("groupChatSection").classList.remove("d-none");
    }
});

// Register/Login User
function registerUser() {
    let username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username);
        document.getElementById("authSection").classList.add("d-none");
        document.getElementById("chatSection").classList.remove("d-none");
        document.getElementById("groupChatSection").classList.remove("d-none");
    }
}

// Send Message in P2P Chat
function sendMessage() {
    let message = document.getElementById("messageInput").value;
    if (message.trim() !== "") {
        let chatBox = document.getElementById("chatBox");
        chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
        document.getElementById("messageInput").value = "";

        // TODO: Implement P2P WebRTC-based message sending
    }
}

// Send Message in Group Chat
function sendGroupMessage() {
    let message = document.getElementById("groupMessageInput").value;
    if (message.trim() !== "") {
        let groupChatBox = document.getElementById("groupChatBox");
        groupChatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
        document.getElementById("groupMessageInput").value = "";

        // TODO: Implement group chat using Smart Contracts
    }
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("username");
    location.reload();
});
