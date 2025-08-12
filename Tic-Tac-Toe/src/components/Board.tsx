import React from "react";
import Square from "./Square";

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
}

export default function Board({ squares, onClick }: BoardProps) {
  return (
    <div className="board">
      {squares.map((val, i) => (
        <Square key={i} value={val} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}
