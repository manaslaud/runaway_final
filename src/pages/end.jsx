import React from 'react';

function EndPage({ gameData, score }) {
  return (
    <div>
      <h1>End Page</h1>
      <p>Final Data: {score}</p>
    </div>
  );
}

export default EndPage;
