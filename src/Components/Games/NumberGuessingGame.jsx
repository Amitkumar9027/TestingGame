import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NumberGuessingGame.css';

const NumberGuessingGame = () => {
  const navigate = useNavigate();
  const [targetNumber, setTargetNumber] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(randomNumber);
    setUserGuess('');
    setMessage('');
    setGuessCount(0);
    setGameStarted(true);
    setGameWon(false);
  };

  const handleGuessChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 1 && Number(value) <= 100)) {
      setUserGuess(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userGuess === '') {
      setMessage('Please enter a number between 1 and 100');
      return;
    }

    const guess = parseInt(userGuess, 10);
    setGuessCount(guessCount + 1);

    if (guess === targetNumber) {
      setMessage(`Congratulations! You guessed the number in ${guessCount + 1} tries!`);
      setGameWon(true);
    } else if (guess < targetNumber) {
      setMessage('Too low! Try a higher number.');
    } else {
      setMessage('Too high! Try a lower number.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="game-container">
         <button onClick={handleBack} className="back-button">
          &larr; Back
        </button>
      <div className="game-header">
       
        <h1>Number Guessing Game</h1>
      </div>
      
      <p>Guess a number between 1 and 100</p>
      
      {!gameStarted ? (
        <button onClick={startNewGame} className="start-button">
          Start Game
        </button>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="guess-form">
            <input
              type="number"
              min="1"
              max="100"
              value={userGuess}
              onChange={handleGuessChange}
              disabled={gameWon}
              className="guess-input"
              placeholder="Enter your guess"
            />
            <div className="button-group">
              <button 
                type="submit" 
                disabled={gameWon}
                className="submit-button"
              >
                Submit Guess
              </button>
              <button 
                onClick={startNewGame} 
                className="restart-button"
              >
                Restart Game
              </button>
            </div>
          </form>
          
          {message && <p className={`message ${gameWon ? 'success' : ''}`}>{message}</p>}
          
          {gameWon && (
            <button onClick={startNewGame} className="play-again-button">
              Play Again
            </button>
          )}
          
          <div className="stats">
            <p>Guesses: {guessCount}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default NumberGuessingGame;