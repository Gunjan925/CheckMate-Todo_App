import React, { useState } from 'react';
import '../Styles/Signup.css';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation / API call here
    console.log(userName,email,password);
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your <span className="brand">CheckMate</span> Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userName}
          onChange={(e)=>setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
          </span>
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <div className="login-redirect">
            Already have an account? <Link to="/login" className="login-link">Login here</Link>
        </div>
        <div className="back-home">
            <Link to="/" className="home-link">← Back to Home</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
