import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="left-section">
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>

        {menuOpen && (
          // <div className="dropdown-menu">
          //   <a href="#">Home</a>
          //   <a href="#">Profile</a>
          //   <a href="#">Settings</a>
          //   <a href="#">Help</a>
          // </div>
          <div className="dropdown-menu">
            <Link to="/">Home</Link>
            <Link to="/login">User Manager</Link>
            <Link to="/Dashboard">Employee Manager</Link>
            <Link to="/table">User List</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/help">Help</Link>
          </div>
        )}
      </div>

      <div className="center-section">
        <input type="text" placeholder="Search..." className="search-box" />
      </div>

      <div className="right-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User"
          className="icon"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
          alt="Logout"
          className="icon"
        />
      </div>
    </header>
  );
}

export default Header;
