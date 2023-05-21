  import React, { useState, useEffect, useRef } from "react";

  const Game = () => {
    const [playerPosition, setPlayerPosition] = useState({ x: 250, y: 250 });
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const targetPositionRef = useRef({ x: 250, y: 250})
    const counter = useRef(0);
    const [gameOver, setGameOver] = useState(false);
    const [lastx, setLastx] = useState(0);
    const [lasty, setLasty] = useState(0);
  
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
        const speed = 3;
  
        // Calculate the velocity components
        const velocityX = (directionX / distance) * speed;
        const velocityY = (directionY / distance) * speed;

        
        var newX = currentX +velocityX ;
        var newY = currentY + velocityY;

        
        if(newX > 600){
          newX = 600;
        }
        if(newX < 0){
          newX = 0;
        }
        if(newY > 600){
          newY = 600;
        }
        if(newY < 0){
          newY = 0;
        }
        setPlayerPosition({ x: newX, y: newY });
      };

      
      window.addEventListener("mousemove", handleMouseMove);
      // console.log("testing")
      return () => {
        //clearInterval(movePlayerInterval);
        window.removeEventListener("mousemove", handleMouseMove);
      };
  
    }, [playerPosition, enemies]);
  
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


    useEffect(() => {
      const moveIIT = () => {
        setEnemies((prevEnemies) =>
          prevEnemies.map((enemy) => {
            if (enemy.type === "IIT") {
              const updatedEnemy = { ...enemy };
              const directionX = lastx - updatedEnemy.x;
              const directionY = lasty - updatedEnemy.y;
              const distance = Math.sqrt(directionX ** 2 + directionY ** 2);
        
              // Set a constant velocity magnitude        
              // Calculate the velocity components
              const velocityX = (directionX / distance) * updatedEnemy.speed;
              const velocityY = (directionY / distance) * updatedEnemy.speed;
        
              // Update the player position
              updatedEnemy.x = updatedEnemy.x + velocityX;
              updatedEnemy.y = updatedEnemy.y + velocityY;
              return updatedEnemy;
            }
            return enemy;
          })
        );
      };
      counter.current = counter.current + 1;
      if(counter.current > 100000){
        moveIIT();
        if(counter.current > 800000){
          counter.current = 0;
        }
      }
      else{
        setLastx(playerPosition.x);
        setLasty(playerPosition.y);
      }

      return () => {
        clearInterval(moveIIT);
      };
    }, [playerPosition, enemies, lastx, lasty]);

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
          
          const enemy = {type : "IIT", x: Math.random() * 500, y: Math.random() * 500, speed:0.009 }
    
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
