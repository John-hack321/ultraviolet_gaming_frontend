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

  // Custom square styles for wooden texture
  const customSquareStyles = {};
  
  // Generate styles for all squares
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const file = String.fromCharCode(97 + j); // a-h
      const rank = 8 - i; // 8-1
      const square = file + rank;
      const isLight = (i + j) % 2 === 0;
      
      customSquareStyles[square] = {
        backgroundImage: isLight 
          ? 'url("/light_maple.jpg")' 
          : 'url("/dark_maple.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <style jsx global>{`
        /* Additional wooden board styling */
        .chess-board {
          box-shadow: 
            0 8px 32px rgba(101, 67, 33, 0.3),
            inset 0 0 0 8px #8B4513,
            inset 0 0 0 12px #D2691E;
          border-radius: 8px;
          background: linear-gradient(45deg, #8B4513, #D2691E);
          padding: 8px;
        }
        
        /* Enhance piece shadows for realism */
        .chess-piece {
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
        }
        
        /* Board coordinates styling */
        .coordinate {
          color: #654321 !important;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(255,255,255,0.3);
        }
      `}</style>
      
      <Chessboard
        position={position}
        onPieceDrop={onDrop}
        boardWidth={Math.min(typeof window !== 'undefined' ? window.innerWidth - 32 : 400, 400)}
        customSquareStyles={customSquareStyles}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(101, 67, 33, 0.3)',
        }}
        customLightSquareStyle={{
          backgroundImage: 'url("/light_maple.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        customDarkSquareStyle={{
          backgroundImage: 'url("/dark_maple.jpg")',
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