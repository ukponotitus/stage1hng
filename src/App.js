import confetti from 'canvas-confetti';
import './App.css';
import React, { useState, useEffect, useCallback } from "react";

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
    setScore(0);
  };

  const celebrate = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setStatus("Correct! 🎉");
      celebrate();
      setTargetColor(getRandomColor());
    } else {
      setStatus("Wrong! Try again.");
      setScore(0);
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
