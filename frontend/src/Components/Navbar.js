import React from 'react';
import {Link ,useNavigate} from "react-router-dom";
import '../Styles/Navbar.css';
import axios from "axios";

const Navbar = ({isLogin}) => {
  const username = localStorage.getItem("user_name") || "";
  const token = localStorage.getItem("token") || "";

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
      "http://localhost:5000/api/auth/logout",
      {}, // body can be empty
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // send token : Without the token, the backend sees it as unauthorized → returns 401.
        },
      }
    );
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      // alert("Logged out successfully!");
      // navigate("/");
      navigate('/',{state : {message : 'Successfully logged out !!' }});
    } catch (error) {
      alert("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">CheckMate</div>
      <div className="navbar-links">
        {isLogin ? (
          <>
            <Link
              className="navbar-link"
              onClick={handleLogout}
              title={username ? `Logged in as ${username}` : "No one logged in"}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/signup" className="navbar-link">SignUp</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
