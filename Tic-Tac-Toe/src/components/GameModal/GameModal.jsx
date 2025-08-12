import React from 'react';
import styles from './GameModal.module.css';

function GameModal({ winner, isTie, onReset }) {
  if (!winner && !isTie) {
    return null;
  }

  const message = isTie ? "It's a Tie!" : `Winner: ${winner}`;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{message}</h2>
        <button className={styles.resetButton} onClick={onReset}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameModal;