import React, { useState , useEffect} from 'react';
import '../Styles/Todos.css';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const Todos = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState('');
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Track editing todo
  const [editId, setEditId] = useState(null); 
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDeadline, setEditDeadline] = useState("");

  const token = localStorage.getItem('token');

  // Load all the todos of the users as soon as this page is loaded
  useEffect(()=>{
    fetchTodos();
  },[]);

  const fetchTodos = async()=>{
    try{
      const res = await axios.get("http://localhost:5000/api/todos",{
        headers : {Authorization: `Bearer ${token}`},
      });
      setTodos(res.data);
      setFilteredTodos(res.data);
    }catch(err){
      alert("Something went wrong. Please try again.");
      console.log("Error fetching notes : ",err);
    }
  };

  const isDeadlineClose = (deadlineDate) => {
    const today = new Date();
    const deadline = new Date(deadlineDate);
    const diffTime = deadline - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 2 && diffDays >= 0;
  };

  const addTodo = async() => {
    if (title.trim() && desc.trim() && deadline) {
      try{
        const res = await axios.post("http://localhost:5000/api/todos",
          // req.body
          {
            title,desc,deadline
          },
          {headers:{Authorization:`Bearer ${token}`}}
        );
        const newTodos = [...todos,res.data];
        setTodos(newTodos);
        setFilteredTodos(newTodos);
        setTitle("");
        setDesc("");
        setDeadline("");
      }catch(err){
        alert("Something went wrong. Please try again.");
        console.log("Error adding todo : ",err);
      }
    }
  };

  const toggleComplete = async (todoId) => {
    try{
      await axios.patch(`http://localhost:5000/api/todos/${todoId}`,{},{
        headers:{Authorization:`Bearer ${token}`}
      });
      fetchTodos();
    }catch(err){
      console.log("Cant toggle todo : ",err);
    }
  };

  const deleteTodo = async (todoId) => {
    try{
      await axios.delete(`http://localhost:5000/api/todos/${todoId}`,{
        headers:{Authorization:`Bearer ${token}`}
      });
      fetchTodos();
    }catch(err){
      console.log("Cant delete todo : ",err);
    }
  };

  const startEdit = (todo) => {
    setEditId(todo.todo_id);
    setEditTitle(todo.todo_title);
    setEditDesc(todo.todo_desc);
    const formattedDeadline = todo.todo_deadline ? new Date(todo.todo_deadline).toISOString().split("T")[0] : "";
    setEditDeadline(formattedDeadline);
  };

  const saveEdit = async() => {
    try{
      await axios.put(`http://localhost:5000/api/todos/${editId}`,
        {
          title:editTitle,
          desc:editDesc,
          deadline:editDeadline
        },
      {
        headers:{Authorization:`Bearer ${token}`}
      });
      fetchTodos();
      cancelEdit();
    }catch(err){
      console.log("Error updating todo : ",err);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
    setEditDeadline("");
  };

  const handleFilters = (e,filter)=>{
    e.preventDefault();
    setFilter(filter);
    if(filter === 'all'){
      setFilteredTodos(todos);
    }else if(filter === 'completed'){
      setFilteredTodos(todos.filter((todo) => todo.is_completed));
    }else if (filter === "urgent") {
    setFilteredTodos(todos.filter((todo) => isDeadlineClose(todo.todo_deadline)));
  }
  };

  return (
    <>
    <Navbar isLogin={true}/>
    <div className="todos-container">
      <div className="form-section">
        <h2>Create <span className="brand">To-Do</span></h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="8"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>

      <div className="list-section">
        <h2>Your <span className="brand">Tasks</span></h2>
        <div className="filter-buttons">
            <button onClick={(e) => handleFilters(e,'all')} className={`${filter === 'all' ? 'grey' : '' } active`}>All</button>
            <button onClick={(e) => handleFilters(e,'completed')} className={`${filter === 'completed' ? 'grey' : '' } green`}>Show Completed</button>
            <button onClick={(e) => handleFilters(e,'urgent')} className={`${filter === 'urgent' ? 'grey' : '' } red`}>Show Deadline Close</button>
          </div>
        {filteredTodos.length === 0 ? (
          <p className="no-tasks">No tasks yet.</p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.todo_id}
              className={`todo-card ${todo.is_completed ? 'completed' : isDeadlineClose(todo.todo_deadline) ? 'urgent' : ''} `}
            >


              {editId === todo.todo_id ? (
                  // ✅ Inline edit form
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      rows="5"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    ></textarea>
                    <input
                      type="date"
                      value={editDeadline}
                      onChange={(e) => setEditDeadline(e.target.value)}
                    />
                    <div className="edit-actions">
                      <button onClick={saveEdit} className='green'>Save</button>
                      <button onClick={cancelEdit} className='red'>Cancel</button>
                    </div>
                  </div>
                ) : (
                  // ✅ Normal view
                  <>
                    <div className="todo-main">
                      <h3>{todo.todo_title}</h3>
                      <p>{todo.todo_desc}</p>
                    </div>
                    <div className="todo-actions">
                      <div className="deadline">Deadline: {todo.todo_deadline ? new Date(todo.todo_deadline).toISOString().split("T")[0] : ""}</div>
                      <div className="actions">
                        <i
                          className="fa-solid fa-check"
                          title="Complete"
                          onClick={() => toggleComplete(todo.todo_id)}
                        ></i>
                        <i
                          className="fa-solid fa-pen-to-square"
                          title="Edit"
                          onClick={() => startEdit(todo)}
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          title="Delete"
                          onClick={() => deleteTodo(todo.todo_id)}
                        ></i>
                      </div>
                    </div>
                  </>
                )}

            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default Todos;