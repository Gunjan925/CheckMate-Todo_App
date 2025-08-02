import React from 'react';
import {Link} from "react-router-dom";
import '../Styles/Navbar.css';

const Navbar = ({isLogin}) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">CheckMate</div>
      <div className="navbar-links">
        {isLogin ? (
          <>
            <Link to="/logout" className="navbar-link">Logout</Link>
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
