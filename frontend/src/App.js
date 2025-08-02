import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home.js';
import SignUp from './Pages/Signup.js';
import Login from './Pages/Login.js';
import Todos from './Pages/Todos.js';
// import SignUp from './Components/signup';
// import Login from './Components/login';
// import AddTodo from './Components/addTodo';
function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </Router>
  );
}

export default App;