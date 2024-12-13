import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="dashboard">
    
      <div className="buttons">
        <Link to="/createquiz" className="button create-quiz">Create Quiz</Link>
        <Link to="/listquiz" className="button quiz-list">Quiz List</Link>
      </div>
    </div>
  );
};

export default Home;
