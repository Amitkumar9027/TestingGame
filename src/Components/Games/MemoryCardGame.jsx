import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryCardGame.css';
import img1 from '../../assets/Images/memoryCard/1.png';
import img2 from '../../assets/Images/memoryCard/2.png';
import img3 from '../../assets/Images/memoryCard/3.jpg';
import img4 from '../../assets/Images/memoryCard/4.jpg';
import img5 from '../../assets/Images/memoryCard/5.png';
import img6 from '../../assets/Images/memoryCard/6.jpg';

const cardImages = [
  { src: img1, matched: false },
  { src: img2, matched: false },
  { src: img3, matched: false },
  { src: img4, matched: false },
  { src: img5, matched: false },
  { src: img6, matched: false }
];

const MemoryCardGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  // Shuffle cards and reset game state
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setCards(shuffledCards);
    setTurns(0);
    setMatchedPairs(0);
    setGameWon(false);
    setGameStarted(true);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  // Handle card selection
  const handleChoice = (card) => {
    // Don't allow selection if:
    // - Cards are disabled during flip animation
    // - Card is already matched
    // - Card is already selected
    // - Game is won
    if (disabled || card.matched || card === choiceOne || gameWon) return;
    
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      setTurns(prevTurns => prevTurns + 1);

      if (choiceOne.src === choiceTwo.src) {
        // Mark both cards as matched
        setCards(prevCards => 
          prevCards.map(card => 
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        resetTurn();
      } else {
        // No match - flip cards back after delay
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Check for win condition
  useEffect(() => {
    if (gameStarted && matchedPairs === cardImages.length) {
      setGameWon(true);
    }
  }, [matchedPairs, gameStarted]);

  // Reset current turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="memory-game-container">
      <div className="game-header">
        <button onClick={handleBack} className="back-button">
          &larr; Back
        </button>
        <h1>Memory Card Game</h1>
      </div>

      <p>Flip two cards at a time and match all pairs to win!</p>

      {!gameStarted ? (
        <button onClick={shuffleCards} className="start-button">
          Start Game
        </button>
      ) : (
        <>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(matchedPairs / cardImages.length) * 100}%` }}
            ></div>
            <span className="progress-text">
              {matchedPairs}/{cardImages.length} pairs matched
            </span>
          </div>

          <div className="card-grid">
            {cards.map(card => (
              <div 
                key={card.id}
                className={`card ${card.matched ? 'matched' : ''} 
                  ${(choiceOne === card || choiceTwo === card) ? 'flipped' : ''}`}
                onClick={() => handleChoice(card)}
              >
                <div className="front">
                  <img src={card.src} alt="card front" />
                </div>
                <div className="back"></div>
              </div>
            ))}
          </div>

          <div className="stats">
            <p>Turns: {turns}</p>
            {gameWon && (
              <div className="win-message">
                <p>Congratulations! You won in {turns} turns!</p>
                <button onClick={shuffleCards} className="play-again-button">
                  Play Again
                </button>
              </div>
            )}
          </div>

          <button onClick={shuffleCards} className="restart-button">
            Restart Game
          </button>
        </>
      )}
    </div>
  );
};

export default MemoryCardGame;