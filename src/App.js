  import React, { useState, useEffect } from "react";

  const Game = () => {
    const [playerPosition, setPlayerPosition] = useState({ x: 250, y: 250 });
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
      // Handle player movement with arrow keys
      const handleKeyPress = (event) => {
        const { keyCode } = event;
        const newPosition = { ...playerPosition };
        
        
        for(let i = 0; i < 5; i++){
          if (keyCode === 37) { 
            // Left arrow key
            newPosition.x -= 1;
          } else if (keyCode === 39) {
            // Right arrow key
            newPosition.x += 1;
          } else if (keyCode === 38) {
            // Up arrow key
            newPosition.y -= 1;
          } else if (keyCode === 40) {
            // Down arrow key
            newPosition.y += 1;
          }

          setPlayerPosition(newPosition);
      };
    }
      

      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [playerPosition]);

    useEffect(() => {
      const moveNITandLPU = enemies.map((enemy) => {
        if (enemy.type === "LPU") {
          const updatedenemy = {...enemy};
          updatedenemy.x = updatedenemy.x + updatedenemy.speed;
          if (updatedenemy.x > 1000) {
            updatedenemy.speed = -updatedenemy.speed;
            updatedenemy.x = updatedenemy.x + updatedenemy.speed;
          }
          return updatedenemy
        }
        if (enemy.type === "NIT") {
          const updatedEnemy = { ...enemy };
          if (enemy.y > playerPosition.y) {
            updatedEnemy.y = enemy.y - enemy.speed;
          } else {
            updatedEnemy.y = enemy.y + enemy.speed;
          }
          if (enemy.x > playerPosition.x) {
            updatedEnemy.x = enemy.x - enemy.speed;
          } else {
            updatedEnemy.x = enemy.x + enemy.speed;
          }
          return updatedEnemy;
        }
        return enemy;
      });
    
      setEnemies(moveNITandLPU);
    }, [enemies, playerPosition]);
    let counter = 0;
    useEffect(() => {
      counter = counter + 1
      const moveIIT = () => {
        setEnemies((prevEnemies) =>
          prevEnemies.map((enemy) => {
            if (enemy.type === "IIT") {
              const updatedEnemy = { ...enemy };
              if (enemy.y > playerPosition.y) {
                updatedEnemy.y = enemy.y - enemy.speed;
              } else {
                updatedEnemy.y = enemy.y + enemy.speed;
              }
              if (enemy.x > playerPosition.x) {
                updatedEnemy.x = enemy.x - enemy.speed;
              } else {
                updatedEnemy.x = enemy.x + enemy.speed;
              }
              return updatedEnemy;
            }
            return enemy;
          })
        );
      };
      const moveIITInterval = null;
      if(counter > 5000){
        const moveIITInterval = setInterval(moveIIT, 5000);
        if(counter > 10000){
          counter = 0;
        }
      }

      return () => {
        clearInterval(moveIITInterval);
      };
    }, [playerPosition, enemies]);

    useEffect(() => {
      const delayedinterval = (callback, delay) => {
        const intervalid = setInterval(callback, delay);
        return intervalid;
        
      }
      const spawnEnemyLPU = () => {
        const enemy = { type: "LPU", x: Math.random() * 500, y: Math.random() * 500, speed:0.010 };
              
        setEnemies((prevEnemies) => [...prevEnemies, enemy]);
        return enemy;
      };
      const spawnEnemyNIT = () => {

        const enemy = {type : "NIT", x: Math.random() * 500, y: Math.random() * 500, speed:0.005 }

        setEnemies((prevEnemies) => [...prevEnemies, enemy]);
        return enemy;
      }
      const spawnEnemyIIT = () => {
          
          const enemy = {type : "IIT", x: Math.random() * 500, y: Math.random() * 500, speed:40 }
    
          setEnemies((prevEnemies) => [...prevEnemies, enemy]);
          return enemy;
      }

      const spawnInterval = setInterval(spawnEnemyLPU, 2000);
      const delayedinterval1 = delayedinterval(spawnEnemyNIT, 5000);
      const delayedinterval2 = delayedinterval(spawnEnemyIIT, 10000);
      return () => {
        clearInterval(spawnInterval);
        clearInterval(delayedinterval1);
        clearInterval(delayedinterval2);
      };
    }, []);

    useEffect(() => {
      const checkCollision = () => {
        for (const enemy of enemies) {
          if (
            playerPosition.x+10 > enemy.x && playerPosition.x-10 < enemy.x &&
            playerPosition.y +10 > enemy.y && playerPosition.y-10 < enemy.y
          ) {
            setGameOver(true);
            break;
          }
        }
      };

      checkCollision();
    }, [playerPosition, enemies]);

    useEffect(() => {
      const scoreInterval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
      }, 1000);

      return () => {
        clearInterval(scoreInterval);
      };
    }, []);
    const getEnemyBackground = (type) => {
      if (type === "LPU") {
      return "red";
      } else if (type === "IIT") {
      return "pink";
      } else if (type === "NIT") {
      return "orange";
      } else {
      return "gray"; // Default color if type is not recognized
      }
        };    
    return (
      <div>
        {gameOver ? (
          <div>Game Over! Final Score: {score}</div>
        ) : (
          <div>Score: {score}</div>
        )}
        <div
          style={{
            position: "relative",
            width: "1300px",
            height: "600px",
            border: "1px solid black",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: playerPosition.y,
              left: playerPosition.x,
              width: "20px",
              height: "20px",
              background: "blue",
            }}
          ></div>
          {enemies.map((enemy, index) => (
            
            <div
              key={index}
              style={{
                position: "absolute",
                top: enemy.y,
                left: enemy.x,
                width: "20px",
                height: "20px",
                background: getEnemyBackground(enemy.type),
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  export default Game;
