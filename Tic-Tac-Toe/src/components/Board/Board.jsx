import React from 'react';
import Square from '../Square/Square.jsx';
import styles from './Board.module.css';

function Board({ squares, onPlay, winningInfo }) {
  function handleClick(i) {
    // The Board's only job is to report the click event.
    // It passes the index of the clicked square to the App component.
    onPlay(i);
  }

  const renderSquare = (i) => {
    const isWinning = winningInfo.line.includes(i);
    return (
      <Square 
        key={i}
        value={squares[i]} 
        onSquareClick={() => handleClick(i)}
        isWinning={isWinning}
      />
    );
  };
  
  const boardSquares = [];
  for (let i = 0; i < 9; i++) {
    boardSquares.push(renderSquare(i));
  }

  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        {boardSquares}
      </div>
      {winningInfo.winner && (
        <div 
          className={styles.strike} 
          style={winningInfo.style}
        ></div>
      )}
    </div>
  );
}

export default Board;