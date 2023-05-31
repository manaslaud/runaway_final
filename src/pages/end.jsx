import React from 'react';
import CustomGroupingTable from './leaderboard.jsx';
import './end.css';
import { useNavigate } from 'react-router-dom';



function EndPage({ gameData, score }) {
  const navigate =  useNavigate();
  
  const redirect = () => {
    navigate('/');
  }

  return (
    <div class="container">
       <button class="Replay" onClick={redirect}>Replay</button>
      <h3 class="scoreText">Your score is {score} in {gameData}</h3>
      <div class="ScoreContainer">
      <CustomGroupingTable />
      </div>
    </div>
  );
}

export default EndPage;
