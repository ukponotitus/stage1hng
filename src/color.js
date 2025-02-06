import "./color.css"
import { useState, useEffect, useCallback } from "react"
import confetti from "canvas-confetti"

const colorShades = {
  red: ["#FFB3BA", "#FF6961", "#FF0000", "#8B0000", "#660000", "#560319"],
  blue: ["#ADD8E6", "#0000FF", "#00008B", "#000080", "#191970", "#0F52BA"],
  green: ["#90EE90", "#32CD32", "#00FF00", "#008000", "#006400", "#228B22"],
  yellow: ["#FFFFE0", "#FFFF00", "#FFD700", "#FFA500", "#FF8C00", "#DAA520"],
  purple: ["#E6E6FA", "#9370DB", "#8A2BE2", "#4B0082", "#663399", "#301934"],
  orange: ["#FFEFD5", "#FFD700", "#FFA500", "#FF8C00", "#FF4500", "#FF681F"],
}

const ColorShadeGame = () => {
  const [targetColor, setTargetColor] = useState("")
  const [targetShade, setTargetShade] = useState("")
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("score")
    return savedScore ? JSON.parse(savedScore) : 0
  })
  const [status, setStatus] = useState("")
  const [currentShades, setCurrentShades] = useState([])

  const getRandomColor = useCallback(
    () => Object.keys(colorShades)[Math.floor(Math.random() * Object.keys(colorShades).length)],
    [],
  )

  const getRandomShade = useCallback(
    (color) => colorShades[color][Math.floor(Math.random() * colorShades[color].length)],
    [],
  )

  const startNewGame = useCallback((resetScore = false) => {
    const newTargetColor = getRandomColor()
    const newTargetShade = getRandomShade(newTargetColor)
    setTargetColor(newTargetColor)
    setTargetShade(newTargetShade)
    setStatus("Guess the correct shade!")
    updateShades(newTargetColor)

    if (resetScore) {
      setScore(0)
      localStorage.setItem("score", JSON.stringify(0))
    }
  }, [getRandomColor, getRandomShade])

  const updateShades = useCallback((color) => {
    setCurrentShades(colorShades[color])
  }, [])

  const celebrate = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  const handleGuess = useCallback(
    (shade) => {
      if (shade === targetShade) {
        setScore((prevScore) => {
          const newScore = prevScore + 1
          localStorage.setItem("score", JSON.stringify(newScore))
          return newScore
        })
        setStatus("Correct! 👏")
        celebrate()
        setTimeout(() => startNewGame(false), 2000)
      } else {
        setStatus("Incorrect. Try again!")
      }
    },
    [targetShade, startNewGame, celebrate],
  )

  useEffect(() => {
    startNewGame(false)
  }, [startNewGame])

  if (!targetColor || !targetShade) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <h1>Color Shades Guessing Game</h1>
      <div data-testid="colorBox"  className="color-box" style={{ backgroundColor: targetShade }}></div>
      <p data-testid="gameInstructions">Guess the correct shade of {targetColor}!</p>
      <div className="button-container">
        {currentShades.map((shade) => (
          <button
            key={shade}
            data-testid="colorOption"
            className="color-button"
            style={{ backgroundColor: shade }}
            onClick={() => handleGuess(shade)}
          />
        ))}
      </div>
      <p data-testid="gameStatus">{status}</p>
      <p data-testid="score">Score: {score}</p>
      <button 
        data-testid="newGameButton" 
        className="new-game-button" 
        onClick={() => startNewGame(true)}
      >
        New Game
      </button>
    </div>
  )
}

export default ColorShadeGame