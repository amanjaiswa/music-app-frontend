import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import "./css/Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
