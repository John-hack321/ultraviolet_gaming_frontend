'use client';
import { useState, CSSProperties } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './Chessboard.css';

type Square =
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8'
  | 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8'
  | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8'
  | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8'
  | 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8'
  | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8'
  | 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';

export default function ChessGame() {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());

  const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return false;
    setPosition(game.fen());
    return true;
  };

  // Custom square styles for wooden texture
  const customSquareStyles: { [key: string]: CSSProperties } = {};

  // Generate styles for all squares
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const file = String.fromCharCode(97 + j); // a-h
      const rank = 8 - i; // 8-1
      const square = `${file}${rank}` as Square;
      const isLight = (i + j) % 2 === 0;

      customSquareStyles[square] = {
        backgroundImage: isLight
          ? 'url("/light_mapple.png")'
          : 'url("/dark_mapple.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Chessboard
        fen={position}
        onPieceDrop={onDrop}
        boardWidth={
          Math.min(
            typeof window !== 'undefined' ? window.innerWidth - 32 : 400,
            400
          )
        }
        customSquareStyles={customSquareStyles}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(101, 67, 33, 0.3)',
        }}
        customLightSquareStyle={{
          backgroundImage: 'url("/light_mapple.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        customDarkSquareStyle={{
          backgroundImage: 'url("/dark_mapple.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        areArrowsAllowed={true}
        arrowColor="rgba(255, 255, 0, 0.8)"
        boardOrientation="white"
        showBoardNotation={true}
        customNotationStyle={{
          color: '#654321',
          fontWeight: 'bold',
          fontSize: '12px',
        }}
      />
    </div>
  );
}
