import './App.css';
import React, { useState, useEffect } from "react";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const startNewGame = () => {
    setTargetColor(getRandomColor());
    setStatus("Guess the correct color!");
    setScore(0)
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setStatus("Correct! 🎉");
      setTargetColor(getRandomColor());
    } else {
      setStatus("Wrong! Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Color Guessing Game</h1>
      <div data-testid="colorBox" className="color-box" style={{ backgroundColor: targetColor }}></div>
      <p data-testid="gameInstructions">Guess the correct color!</p>
      <div className="button-container">
        {colors.map((color) => (
          <button
            key={color}
            data-testid="colorOption"
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
      </div>
      <p data-testid="gameStatus">{status}</p>
      <p data-testid="score">Score: {score}</p>
      <button data-testid="newGameButton" className="new-game-button" onClick={startNewGame}>
        New Game
      </button>
    </div>
  );
};

export default ColorGame;