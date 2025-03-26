import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UsernameInput = ({ setUsername }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (name.trim()) {
      setUsername(name);
      navigate("/direct-chat");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Enter Your Username</h2>
      <input 
        type="text" 
        className="form-control mt-3 w-50 mx-auto" 
        placeholder="Username"
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleJoin}>Join Chat</button>
    </div>
  );
};

export default UsernameInput;
