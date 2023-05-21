  import React, { useState, useEffect, useRef } from "react";

  const Game = () => {
    const [playerPosition, setPlayerPosition] = useState({ x: 250, y: 250 });
    const [targetPosition, setTargetPosition] = useState({ x: 250, y: 250 });
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const targetPositionRef = useRef({ x: 250, y: 250})
    const [gameOver, setGameOver] = useState(false);
  
    useEffect(() => {                
      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        targetPositionRef.current = { x: clientX, y: clientY };
      
        const { x: targetX, y: targetY } = targetPositionRef.current;
        const { x: currentX, y: currentY } = playerPosition;
  
        // Calculate the direction vector towards the target
        const directionX = targetX - currentX;
        const directionY = targetY - currentY;
        const distance = Math.sqrt(directionX ** 2 + directionY ** 2);
  
        // Set a constant velocity magnitude
        const speed = 1;
  
        // Calculate the velocity components
        const velocityX = (directionX / distance) * speed;
        const velocityY = (directionY / distance) * speed;
  
        // Update the player position
        const newX = currentX + velocityX;
        const newY = currentY + velocityY;
        setPlayerPosition({ x: newX, y: newY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      
      return () => {
        //clearInterval(movePlayerInterval);
        window.removeEventListener("mousemove", handleMouseMove);
      };
  
    }, [playerPosition]);
  

    useEffect(() => {
      const moveNITandLPU = enemies.map((enemy) => {
        if (enemy.type === "LPU") {
          const updatedenemy = {...enemy};
          updatedenemy.x = updatedenemy.x + updatedenemy.speed;
          if (updatedenemy.x > 600) {
            updatedenemy.speed = -updatedenemy.speed;
            updatedenemy.x = updatedenemy.x + updatedenemy.speed;
          }
          if(updatedenemy.x < 0){
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
      const moveIIT = (lastx, lasty) => {
        setEnemies((prevEnemies) =>
          prevEnemies.map((enemy) => {
            if (enemy.type === "IIT") {
              const updatedEnemy = { ...enemy };
              if (enemy.y > lasty) {
                updatedEnemy.y = enemy.y - enemy.speed;
              } else {
                updatedEnemy.y = enemy.y + enemy.speed;
              }
              if (enemy.x > lastx) {
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
      counter = counter + 1;
      if(counter > 5000){
        moveIIT(lastx, lasty);
        if(counter > 10000){
          counter = 0;
        }
      }
      else{
        var lastx = playerPosition.x;
        var lasty = playerPosition.y;
      }

      return () => {
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
      const delayedinterval1 = delayedinterval(spawnEnemyNIT, 2000);
      const delayedinterval2 = delayedinterval(spawnEnemyIIT, 5000);
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
            width: "600px",
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
