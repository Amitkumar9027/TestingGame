import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReactionGame.css';

const ReactionGame = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('start'); // 'start', 'countdown', 'waiting', 'go', 'tooSoon', 'finished'
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const delayTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const handleBack = () => {
    navigate(-1);
    clearTimeout(delayTimeoutRef.current);
    clearInterval(countdownIntervalRef.current);
  };

  const startGame = () => {
    setReactionTime(null);
    setCountdown(3);
    setGameState('countdown');

    let counter = 3;
    countdownIntervalRef.current = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter <= 0) {
        clearInterval(countdownIntervalRef.current);
        setGameState('waiting');

        const delay = 1000 + Math.random() * 4000; // 1 to 5 seconds
        delayTimeoutRef.current = setTimeout(() => {
          setStartTime(Date.now());
          setGameState('go');
        }, delay);
      }
    }, 1000);
  };

  const handleClick = () => {
    if (gameState === 'start' || gameState === 'finished' || gameState === 'tooSoon') {
      startGame();
      return;
    }

    if (gameState === 'waiting') {
      setGameState('tooSoon');
      clearTimeout(delayTimeoutRef.current);
      return;
    }

    if (gameState === 'go') {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setBestTime(prev => (prev === null || time < prev ? time : prev));
      setGameState('finished');
    }
  };

  const getButtonText = () => {
    switch (gameState) {
      case 'start':
        return 'Start Game';
      case 'countdown':
        return `Get Ready (${countdown})`;
      case 'waiting':
        return 'Wait for "GO"...';
      case 'go':
        return 'CLICK NOW!';
      case 'tooSoon':
        return 'Too Soon! Tap to try again';
      case 'finished':
        return 'Play Again';
      default:
        return 'Start';
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case 'start':
        return 'Click start when ready.';
      case 'countdown':
        return `Game starts in ${countdown}...`;
      case 'waiting':
        return 'Wait for the "GO!" signal...';
      case 'go':
        return 'GO!';
      case 'tooSoon':
        return 'Oops! Too early!';
      case 'finished':
        return `Your reaction time: ${reactionTime}ms`;
      default:
        return '';
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(delayTimeoutRef.current);
      clearInterval(countdownIntervalRef.current);
    };
  }, []);

  return (
    <div className="reaction-game-container">
      <div className="game-header">
        <button onClick={handleBack} className="back-button">
          &larr; Back
        </button>
        <h1>Reaction Time Test</h1>
      </div>

      <div className="game-content">
        <div className={`message ${gameState}`}>
          <p>{getMessage()}</p>
          {gameState === 'finished' && bestTime && (
            <div className="best-time">Best time: {bestTime}ms</div>
          )}
        </div>

        <button
          className={`reaction-button ${gameState}`}
          onClick={handleClick}
          onTouchStart={handleClick}
        >
          {getButtonText()}
        </button>
      </div>

      <div className="instructions">
        <h3>How to play:</h3>
        <ol>
          <li>Click the button to start.</li>
          <li>Wait for the "GO!" signal.</li>
          <li>Click as fast as possible once you see "GO!"</li>
          <li>Clicking too early ends the game.</li>
        </ol>
      </div>
    </div>
  );
};

export default ReactionGame;
