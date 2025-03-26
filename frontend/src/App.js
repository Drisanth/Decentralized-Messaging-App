import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import DirectChat from "./components/DirectChat";
import GroupChat from "./components/GroupChat";
import UsernameInput from "./components/UsernameInput";

function App() {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UsernameInput setUsername={setUsername} />} />
        <Route path="/direct-chat" element={username ? <DirectChat username={username} /> : <Navigate to="/" />} />
        <Route path="/group-chat" element={username ? <GroupChat username={username} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
