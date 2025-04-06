import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import "../Style/singleTodo.css";

const SingleTodo = ({ title, description, completed, createdAt, updatedAt }) => {
    return(
        <>
            <div className="todo-card">
            <div className="todo-card-content">
               <div className="todo-left">
               <h4 className="todo-title">{title}</h4>
                <p className="todo-description">{description}</p>
               </div>
               <div className="todo-right">
               <p className="todo-status">
                <strong>Completed:</strong> {completed ? '✅ Yes' : '❌ No'}
                </p>
                <p className="todo-date">
                <strong>Created:</strong> {createdAt}
                </p>
                <p className="todo-date">
                <strong>Updated:</strong> {updatedAt}
                </p>
               </div>
            </div>
            <div className="todo-card-actions">
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
            </div>
            </div>
        </>
    );
};

export default SingleTodo;