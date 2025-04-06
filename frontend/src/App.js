import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Components/signup';
import Login from './Components/login';
import AddTodo from './Components/addTodo';
function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addTodo" element={<AddTodo />} />
      </Routes>
    </Router>
  );
}

export default App;