import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import "../Style/addTodo.css";
import SingleTodo from "./singleTodo";
// import axios from "axios";

const AddTodo = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");   
    const [description,setDescription] = useState("");

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
        console.log("Note added");
    };

    

  return (
    <>
      <div className="addTodo-Page">
      <div className="addTodo-box">
        <div className="sign-out-btn">
        <h2>Todo Dashoboard</h2>
        <button type="submit" >Sign Out</button>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="addTodo-title">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
          required
        />
        </div>
        <div className="addTodo-description">
        <textarea
          rows="4"
          cols="50"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
        />
        </div>
        <div className="addTodo-button">
        <button type="submit" >Add Note</button>
        </div>
      </form>
    </div>
    <div className="line"></div>
    </div>
    <h2 className="addTodo-h2">Your Notes</h2>
    <SingleTodo title="Note 1" description="Description 1" completed={true}  createdAt= {new Date().toLocaleString()} updatedAt={new Date().toLocaleString()} />
    <SingleTodo title="Note 1" description="Description 1" completed={true}  createdAt= {new Date().toLocaleString()} updatedAt={new Date().toLocaleString()} />
    </>
  );
};

export default AddTodo;