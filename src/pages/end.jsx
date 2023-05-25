import React from 'react';
import CustomGroupingTable from './leaderboard.jsx';

function EndPage({ gameData, score }) {
  return (
    <div>
      <h1>End Page</h1>
      <p>Your score is {score} in {gameData}</p>
      <CustomGroupingTable />
    </div>
  );
}

export default EndPage;
