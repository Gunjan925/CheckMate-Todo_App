import React, { useState } from 'react';
import '../Styles/Todos.css';
import Navbar from '../Components/Navbar';

const Todos = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState('');
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const isDeadlineClose = (deadlineDate) => {
  const today = new Date();
  const deadline = new Date(deadlineDate);
  const diffTime = deadline - today;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 2 && diffDays >= 0;
};

  const addTodo = () => {
    if (title.trim() && desc.trim() && deadline) {
      setTodos([
        ...todos,
        { title, desc, deadline, completed: false }
      ]);
      setTitle('');
      setDesc('');
      setDeadline('');
    }
    setFilteredTodos(todos);
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    
  }

  const handleFilters = (e, selectedFilter) => {
    e.preventDefault();
    setFilter(selectedFilter);
    setFilteredTodos(todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'urgent') return isDeadlineClose(todo.deadline);
    return true; // 'all'
    }));
  }

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
          filteredTodos.map((todo, index) => (
            <div
              key={index}
              className={`todo-card ${todo.completed ? 'completed' : isDeadlineClose(todo.deadline) ? 'urgent' : ''} `}
            >
              <div className="todo-main">
                <h3>{todo.title}</h3>
                <p>{todo.desc}</p>
              </div>
              <div className="todo-actions">
                <div className="deadline">Deadline: {todo.deadline}</div>
                <div className='actions'>
                    <i
                  className="fa-solid fa-check"
                  title="Complete"
                  onClick={() => toggleComplete(index)}
                ></i>
                <i
                  className="fa-solid fa-pen-to-square"
                  title="Edit"
                  onClick={() => editTodo(index)}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  title="Delete"
                  onClick={() => deleteTodo(index)}
                ></i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default Todos;
