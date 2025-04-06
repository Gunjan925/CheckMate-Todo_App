import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import "../Style/signup.css";
// import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();
    const [errorName,setErrorName] = useState("");   
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    const checkName = (e) =>
    {
      if (/^[A-Za-z]*$/.test(e.target.value)) 
      {
        setName(e.target.value);
        setErrorName(""); // Clear error if input is valid
      } 
      else 
      {
        setErrorName("Only alphabets are allowed!");
      }
    }
  const handleSubmit = (e) =>
    {
        e.preventDefault();
        // try
        // {
        //     const res = await axios.post("http://localhost:5000/signUp", {name, email , age , gender , emergencyContact});
        //     alert(res.data.message);
        //     navigate("/home");
        // }
        // catch(err)
        // {
        //     alert("Registration failed : " + err.response.data.error);
        //     navigate("/login");
        // }
        navigate("/addTodo");
        console.log("submiitted");
    };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={checkName}
          required
        />
        {errorName && <p style={{ color: "red" }}>{errorName}</p>} {/* Show error message */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        {/* <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          minLength={8}
          required
        /> */}
        <button type="submit" style={{backgroundColor: "#007bff"}}>Submit</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;