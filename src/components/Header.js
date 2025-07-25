import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
 const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
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
            <Link to="/userManager">User Manager</Link>
            <Link to="/employeeManager">Employee Manager</Link>
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
        onClick={handleLogout}
        title="Logout"
      />
      </div>
    </header>
  );
}

export default Header;
