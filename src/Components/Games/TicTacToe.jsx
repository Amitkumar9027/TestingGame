import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (winner || board[index] || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameHistory([...gameHistory, {winner: gameWinner, board: [...newBoard]}]);
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
      setGameHistory([...gameHistory, {winner: 'Draw', board: [...newBoard]}]);
    } else {
      setGameHistory([...gameHistory, {winner: null, board: [...newBoard]}]);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
    setGameHistory([]);
  };

  const renderSquare = (index) => {
    return (
      <button 
        className={`square ${board[index] ? `square-${board[index].toLowerCase()}` : ''}`} 
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return 'Game ended in a draw!';
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="tic-tac-toe-container">
      <h1>Tic Tac Toe</h1>
      <div className="status">{getStatus()}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
      {gameHistory.length > 0 && (
        <div className="game-history">
          <h3>Game History</h3>
          <ul>
            {gameHistory.map((game, index) => (
              <li key={index}>
                Game {index + 1}: {game.winner ? (game.winner === 'Draw' ? 'Draw' : `Winner: ${game.winner}`) : 'Incomplete'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;