import React, { useState } from "react";
import Board from "./Board";

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  // Each element in history is a snapshot of squares at that moment
  const [history, setHistory] = useState< (string | null)[][] >([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[stepNumber];
  const winner = calculateWinner(currentSquares);

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1); // cut off future states if going back
    const current = newHistory[newHistory.length - 1];
    const squaresCopy = [...current];

    if (winner || squaresCopy[i]) return; // ignore click if game over or square taken

    squaresCopy[i] = xIsNext ? "X" : "O";
    setHistory([...newHistory, squaresCopy]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (move: number) => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const status = winner
    ? `🎉 Winner: ${winner}`
    : stepNumber === 9
      ? "It's a draw!"
      : `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="status">{status}</div>
      
      <Board squares={currentSquares} onClick={handleClick} />

      <button className="reset-btn" onClick={resetGame}>Reset Game</button>

      <div className="history">
        <h3>Move History</h3>
        <ul>
          {history.map((_step, move) => {
            const desc = move ? `Go to move #${move}` : "Go to game start";
            return (
              <li key={move}>
                <button className="history-btn" onClick={() => jumpTo(move)}>
                  {desc}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
