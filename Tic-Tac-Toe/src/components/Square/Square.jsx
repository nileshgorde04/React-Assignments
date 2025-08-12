import React from 'react';
import styles from './Square.module.css';

function Square({ value, onSquareClick, isWinning }) {
  const playerClass = value === 'X' ? styles.x : styles.o;
  const winningClass = isWinning ? styles.winning : '';
  
  return (
    <button 
      className={`${styles.square} ${playerClass} ${winningClass}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;