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

        if (keyCode === 37) { 
          // Left arrow key
          newPosition.x -= 5;
        } else if (keyCode === 39) {
          // Right arrow key
          newPosition.x += 5;
        } else if (keyCode === 38) {
          // Up arrow key
          newPosition.y -= 5;
        } else if (keyCode === 40) {
          // Down arrow key
          newPosition.y += 5;
        }

        setPlayerPosition(newPosition);
      };

      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [playerPosition]);

    useEffect(() => {
      const delayedinterval = (callback, delay) => {
        setTimeout(()=>{
          callback();
    
          setInterval(callback, delay);
        }, delay);
      }

      const moveLPU = enemies.map((enemy) => {
        if(enemy.type === "LPU"){
          let newX = enemy.x + enemy.speed;
          if(newX > 1000){
            enemy.speed = -enemy.speed;
            newX = enemy.x + enemy.speed;
          }

          return {...enemy, x:newX};
          
        }
        return enemy;
      })
      const moveNIT = enemies.map((enemy) => {
        if(enemy.type === "NIT"){
          const updatedEnemy = {...enemy};
          if(enemy.y > playerPosition.y){ 
            updatedEnemy.y = enemy.y - enemy.speed;
          }
          else{
            updatedEnemy.y = enemy.y + enemy.speed;
          }
          if(enemy.x > playerPosition.x){
            updatedEnemy.x = enemy.x - enemy.speed;
          }
          else{
            updatedEnemy.x = enemy.x + enemy.speed;
          }
          return updatedEnemy;
          
        }
        return enemy;
      })

      // const moveIIT = enemies.map((enemy, fixedx, fixedy) =>setInterval( ()=>{
        
      //   if(enemy.type ==="IIT"){
      //     const updatedEnemy = {...enemy};
      //     if(enemy.y > fixedy){ 
      //       updatedEnemy.y = enemy.y - enemy.speed;
      //     }
      //     else{
      //       updatedEnemy.y = fixedy + enemy.speed;
      //     }
      //     if(enemy.x > playerPosition.x){
      //       updatedEnemy.x = fixedx - enemy.speed;
      //     }
      //     else{
      //       updatedEnemy.x = fixedx + enemy.speed;
      //     }
      //     return updatedEnemy;
      //   }
      // },5000));
      setEnemies(moveLPU);
      setEnemies(moveNIT);
      //setEnemies(moveIIT);
      //delayedinterval(moveIIT, 1000);

    }, [playerPosition, enemies]);

    useEffect(() => {
      // Spawn enemies with different movement patterns
      const delayedinterval = (callback, delay) => {
        setTimeout(()=>{
          callback();
    
          setInterval(callback, delay);
        }, delay);
      }
      const spawnEnemyLPU = () => {
        // Randomly generate enemy properties (type, movement pattern, etc.)
        const enemy = { type: "LPU", x: Math.random() * 500, y: Math.random() * 500, speed:12 };
              
        // Add the enemy to the list of enemies
        setEnemies((prevEnemies) => [...prevEnemies, enemy]);
        return enemy;
      };
      const spawnEnemyNIT = () => {

        const enemy = {type : "NIT", x: Math.random() * 500, y: Math.random() * 500, speed:8 }

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
      // Check collision with enemies
      const checkCollision = () => {
        for (const enemy of enemies) {
          if (
            playerPosition.x === enemy.x &&
            playerPosition.y === enemy.y
          ) {
            setGameOver(true);
            break;
          }
        }
      };

      checkCollision();
    }, [playerPosition, enemies]);

    useEffect(() => {
      // Update score as time goes on
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
            width: "1000px",
            height: "1000px",
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
