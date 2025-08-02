import React from 'react';
import Navbar from '../Components/Navbar.js';
import '../Styles/Home.css';

const Home = () => {
  return (
    <>
      <Navbar isLogin={false} />
      <div className="home-container">
        <h1>Welcome to <div className="brand">CheckMate  ✅</div></h1>
        <p className="tagline">Stay organized, stay productive. Your tasks, your control.</p>

        <div className="info-box">
          <p>
            <strong>CheckMate</strong> helps you manage your daily tasks and notes efficiently. 
            Create, edit, and delete tasks anytime, anywhere.
          </p>
          <p>
            <strong>Sign up / Log in</strong> to create and access your personal notes and to-do list.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
