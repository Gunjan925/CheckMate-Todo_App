import React, { useState } from 'react';
import '../Styles/Login.css';
// import { useNavigate, Link } from 'react-router-dom';
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user_name",res.data.user_name);
      alert("Logged in Successfully");
      navigate("/todos");
    }catch(err){
      // handle backend error
      if(err.response && err.response.data)
      {
        alert(err.response.data.message || "login failed");
      }
      else
      {
        console.log(err);
        alert("Something went wrong. Please try again.");
      }
    }
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
            placeholder="Password"
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
