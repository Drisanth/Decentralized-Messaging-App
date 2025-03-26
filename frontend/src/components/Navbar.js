import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">P2P Chat</Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/direct-chat">Direct Chat</Link>
          <Link className="btn btn-outline-light" to="/group-chat">Group Chat</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
