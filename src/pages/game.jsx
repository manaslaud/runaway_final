import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

  const Game = ({gameData, onEnd}) => {
    const [playerPosition, setPlayerPosition] = useState({ x: 250, y: 250 });
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const counter = useRef(0);
    const [gameOver, setGameOver] = useState(false);
    const [lastx, setLastx] = useState(0);
    const [lasty, setLasty] = useState(0);
    const navigate =  useNavigate();

    useEffect(() => {
      const handleMouseMove = (event) => {
        let { clientX, clientY } = event;

        if(clientX > 600){
          clientX = 600;
        }
        if(clientX < 0){
          clientX = 0;
        }
        if(clientY > 600){
          clientY = 600;
        }
        if(clientY < 0){
          clientY = 0;
        }
        setPlayerPosition({ x: clientX, y: clientY });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        //clearInterval(movePlayerInterval);
        window.removeEventListener("mousemove", handleMouseMove);
      };
  
    }, []);
  
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
        const enemy = { type: "LPU", x: Math.random() * 500, y: Math.random() * 500, speed:0.015 };
              
        setEnemies((prevEnemies) => [...prevEnemies, enemy]);
        return enemy;
      };
      const spawnEnemyNIT = () => {

        const enemy = {type : "NIT", x: Math.random() * 500, y: Math.random() * 500, speed:0.008 }

        setEnemies((prevEnemies) => [...prevEnemies, enemy]);
        return enemy;
      }
      const spawnEnemyIIT = () => {
          
          const enemy = {type : "IIT", x: Math.random() * 500, y: Math.random() * 500, speed:0.019 }
    
          setEnemies((prevEnemies) => [...prevEnemies, enemy]);
          return enemy;
      }

      const spawnInterval = setInterval(spawnEnemyLPU, 1500);
      const delayedinterval1 = delayedinterval(spawnEnemyNIT, 1800);
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
            playerPosition.x + 10 > enemy.x && playerPosition.x - 10 < enemy.x &&
            playerPosition.y + 10 > enemy.y && playerPosition.y - 10 < enemy.y
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
      return `${gameData}/level1.png`;
      } else if (type === "IIT") {
        return `${gameData}/level2.png`;
      } else if (type === "NIT") {
        return `${gameData}/level3.png`;
      };
    };
    if(gameOver){
      onEnd(score);
      navigate('/end');
    }
    else{
      return (
        <div>
          {
            <div>Score: {score}</div>
          }
          <div
            style={{
              position: "relative",
              width: "600px",
              height: "600px",
              border: "1px solid black",
            }}
          >
            <img
              src = {`${gameData}/main.png`}
              style={{
                  position: "fixed",
                  width: "30px",
                  height: "30px",
                  pointerEvents: "none",
                  zIndex: "9999",
                  top: playerPosition.y - 15,
                  left: playerPosition.x - 15,
                  cursor: "none"
              }}
            />
            {enemies.map((enemy, index) => (
              <img
                src = {getEnemyBackground(enemy.type)}
                key={index}
                style={{
                  position: "absolute",
                  top: enemy.y - 15,
                  left: enemy.x -15,
                  width: "30px",
                  height: "30px"
                }}
              />
            ))}
          </div>
        </div>
      );
    };
  };

export default Game;