import React, { useState } from 'react';
import Board from './components/Board/Board.jsx';
import GameModal from './components/GameModal/GameModal.jsx';
import './index.css';

// Helper function to calculate winner and line style
function calculateWinningInfo(squares) {
  const lines = [
    [0, 1, 2, { top: '50px', width: '300px', transform: 'translateY(-50%)' }],
    [3, 4, 5, { top: '155px', width: '300px', transform: 'translateY(-50%)' }],
    [6, 7, 8, { top: '260px', width: '300px', transform: 'translateY(-50%)' }],
    [0, 3, 6, { top: '155px', width: '300px', transform: 'translateY(-50%) rotate(90deg)' }],
    [1, 4, 7, { top: '155px', width: '300px', transform: 'translateY(-50%) rotate(90deg)' }],
    [2, 5, 8, { top: '155px', width: '300px', transform: 'translateY(-50%) rotate(90deg)' }],
    [0, 4, 8, { top: '155px', width: '420px', transform: 'translateY(-50%) rotate(45deg)' }],
    [2, 4, 6, { top: '155px', width: '420px', transform: 'translateY(-50%) rotate(-45deg)' }],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, style] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c],
        style: style,
      };
    }
  }

  return { winner: null, line: [], style: {} };
}


function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  
  // State is derived directly on each render
  const winningInfo = calculateWinningInfo(currentSquares);
  const isTie = !winningInfo.winner && currentSquares.every(Boolean);
  
  function handlePlay(i) {
    // If there's a winner or the square is taken, do nothing
    if (winningInfo.winner || currentSquares[i]) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const newCurrentMove = nextHistory.length - 1;
    
    setHistory(nextHistory);
    setCurrentMove(newCurrentMove);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button 
          onClick={() => jumpTo(move)}
          style={{ 
            padding: '8px 12px', margin: '4px', cursor: 'pointer',
            backgroundColor: move === currentMove ? 'var(--accent-color)' : 'var(--secondary-color)',
            border: 'none', color: 'white', borderRadius: '5px'
          }}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <main style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
      <div className="game">
        <h1 style={{ marginBottom: '20px', fontSize: '3rem', color: 'var(--accent-color)' }}>
          Tic-Tac-Toe
        </h1>
        <h2 style={{ marginBottom: '20px', color: 'var(--font-color)' }}>
          {winningInfo.winner ? 'Game Over' : (isTie ? 'Tie Game' : `Next Player: ${xIsNext ? 'X' : 'O'}`)}
        </h2>
        <Board 
          squares={currentSquares} 
          onPlay={handlePlay} 
          winningInfo={winningInfo}
        />
      </div>
      <div className="game-info" style={{ marginTop: '100px' }}>
        <h3 style={{marginBottom: '10px'}}>Move History</h3>
        <ol style={{ listStyle: 'none', padding: 0 }}>{moves}</ol>
      </div>
      <GameModal winner={winningInfo.winner} isTie={isTie} onReset={handleReset} />
    </main>
  );
}

export default App;