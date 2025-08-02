import React, { useState } from 'react';
import '../Styles/Login.css';
// import { useNavigate, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState("");

//   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation / API call here
    console.log(email,password);
    alert("Logged in successfully!");
    // navigate("/notes");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login to your <span className="brand">CheckMate</span> Account</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
            {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
          </span>
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="login-redirect">
            Don't have an account? <Link to="/signup" className="signup-link">SignUp here</Link>
        </div>
        <div className="back-home">
            <Link to="/" className="home-link">← Back to Home</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
