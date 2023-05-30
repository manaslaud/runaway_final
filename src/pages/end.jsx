import React from 'react';
import CustomGroupingTable from './leaderboard.jsx';
import './end.css';

function EndPage({ gameData, score }) {
  return (
    <div class="container">
       <button class="Replay">Replay</button>
      <h3 class="scoreText">Your score is {score} in {gameData}</h3>
      <div class="ScoreContainer">
      <CustomGroupingTable />
      </div>
    </div>
  );
}

export default EndPage;
