import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/start';
import Game from './pages/game';
import EndPage from './pages/end';

function App() {
  const [gameData, setGameData] = useState(null);

  const handleStart = (data) => {
    setGameData(data);
  };

  const handleEnd = (data) => {
    // Do something with the final data if needed
    console.log(data);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<StartPage onStart={handleStart} />}
        />
        <Route
          path="/game"
          element={<Game gameData={gameData} onEnd={handleEnd} />}
        />
        <Route
          path="/end"
          element={<EndPage gameData={gameData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
