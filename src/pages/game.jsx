import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './game.css';

  const Game = ({gameData, onEnd}) => {
    const [playerPosition, setPlayerPosition] = useState({ x: 250, y: 250 });
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const navigate =  useNavigate();
    const lastxRef = useRef(playerPosition.x);
    const lastyRef = useRef(playerPosition.y);
    const playerPositionRef = useRef(playerPosition);

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
      const moveNITandLPU = () => {
        setEnemies(prevEnemies => {
          return prevEnemies.map(enemy => {
            if (enemy.type === "LPU") {
              const updatedEnemy = { ...enemy };
              updatedEnemy.x = updatedEnemy.x + updatedEnemy.speed;
              if (updatedEnemy.x > 600 || updatedEnemy.x < 0) {
                updatedEnemy.speed = -updatedEnemy.speed;
              }
              return updatedEnemy;
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
        });
      };
    
      const spawnInterval = setInterval(moveNITandLPU, 0.0001);
    
      return () => {
        clearInterval(spawnInterval);
      };
    }, [enemies, playerPosition]);


    useEffect(() => {
      playerPositionRef.current = playerPosition;
    }, [playerPosition]);
    
    useEffect(() => {
      const moveIIT = () => {
        setEnemies((prevEnemies) =>
          prevEnemies.map((enemy) => {
            if (enemy.type === "IIT") {
              const updatedEnemy = { ...enemy };
              const directionX = lastxRef.current - updatedEnemy.x;
              const directionY = lastyRef.current - updatedEnemy.y;
              const distance = Math.sqrt(directionX ** 2 + directionY ** 2);
        
              const velocityX = (directionX / distance) * updatedEnemy.speed;
              const velocityY = (directionY / distance) * updatedEnemy.speed;
        
              updatedEnemy.x = updatedEnemy.x + velocityX;
              updatedEnemy.y = updatedEnemy.y + velocityY;
              return updatedEnemy;
            }
            return enemy;
          })
        );
      };

      const loopingiit = () => {
        lastxRef.current = playerPositionRef.current.x;
        lastyRef.current = playerPositionRef.current.y;
        console.log("looping iit triggered")
        let moveit = setInterval(moveIIT, 0.1);

        setTimeout(() => {
          clearInterval(moveit);
        }, 4000);
      }
      const spawnInterval = setInterval(loopingiit, 6000);

      return () => {
        clearInterval(spawnInterval);
      };
    }, []);

    useEffect(() => {
      const delayedinterval = (callback, delay) => {
        const intervalid = setInterval(callback, delay);
        return intervalid;
        
      }
      const spawnEnemyLPU = () => {
        const enemy = { type: "LPU", x: Math.random() * 500, y: Math.random() * 500, speed:0.2 };
              
        setEnemies((prevEnemies) => [...prevEnemies, enemy]);
        return enemy;
      };
      const spawnEnemyNIT = () => {

        const enemy = {type : "NIT", x: Math.random() * 500, y: Math.random() * 500, speed:0.1 }

        setEnemies((prevEnemies) => [...prevEnemies, enemy]);
        return enemy;
      }
      const spawnEnemyIIT = () => {
          
          const enemy = {type : "IIT", x: Math.random() * 500, y: Math.random() * 500, speed:0.8 }
    
          setEnemies((prevEnemies) => [...prevEnemies, enemy]);
          return enemy;
      }

      const spawnInterval = setInterval(spawnEnemyLPU, 4500);
      const delayedinterval1 = delayedinterval(spawnEnemyNIT, 5400);
      const delayedinterval2 = delayedinterval(spawnEnemyIIT, 15000);
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
        return `${gameData}/level3.png`;
      } else if (type === "NIT") {
        return `${gameData}/level2.png`;
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
          class = "game"
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