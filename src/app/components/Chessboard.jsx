'use client';
import { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

export default function ChessGame() {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());

  const onDrop = (sourceSquare, targetSquare) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return false;
    setPosition(game.fen());
    return true;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Chessboard
        position={position}
        onPieceDrop={onDrop}
        boardWidth={Math.min(window.innerWidth - 32, 400)} // Responsive width
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      />
    </div>
  );
}
