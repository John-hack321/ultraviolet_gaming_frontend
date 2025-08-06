'use client'
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"

export default function board() {
    return(
        <div>
            <Chessboard/>
        </div>
    )
}
'use client';
import { useState, CSSProperties } from 'react';
import { Chess } from 'chess.js';
import { Chessboard as ReactChessboard } from 'react-chessboard';
import './Chessboard.css';

{/* this is the type for the chess board its a typescript union type that represents each square with a */}
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
  const [game, setGame] = useState(new Chess());

  // Fixed onDrop function with proper state management
  const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
    // Create a copy of the current game state
    const gameCopy = new Chess(game.fen());

    try {
      console.log(`Attempting move from ${sourceSquare} to ${targetSquare}`);
      
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      });

      // If move is invalid, return false (piece will snap back)
      if (move === null) {
        console.log(`Invalid move attempt from ${sourceSquare} to ${targetSquare}`);
        return false;
      }

      // Move was successful, update the game state
      // This is the key fix - we update the game state which will trigger a re-render
      setGame(gameCopy);

      console.log('Valid move executed!');
      console.log(`New position: ${gameCopy.fen()}`);
      console.log(`Move details:`, move);

      // Check for game ending conditions
      if (gameCopy.isCheckmate()) {
        console.log('Checkmate!');
        setTimeout(() => resetGame(), 2000); // Give players time to see the checkmate
      } else if (gameCopy.isDraw()) {
        console.log('Game ended in a draw');
        setTimeout(() => resetGame(), 2000);
      } else if (gameCopy.isCheck()) {
        console.log('Check!');
      }

      return true;

    } catch (error) {
      console.error('Error executing move:', error);
      return false;
    }
  };

  // Reset game function
  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    console.log('Game has been successfully reset');
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
          ? 'url(/light_mapple.png)'
          : 'url(/dark_mapple.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
  }

  // Chessboard props with proper typing
  const chessboardProps = {
    position: game.fen(), // Use game.fen() directly instead of separate position state
    onPieceDrop: onDrop,
    boardWidth: Math.min(
      typeof window !== 'undefined' ? window.innerWidth - 32 : 400,
      400
    ),
    customSquareStyles: customSquareStyles,
    customBoardStyle: {
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(101, 67, 33, 0.3)',
    },
    customLightSquareStyle: {
      backgroundImage: 'url("/light_mapple.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    customDarkSquareStyle: {
      backgroundImage: 'url("/dark_mapple.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    areArrowsAllowed: true,
    arrowColor: "rgba(255, 255, 0, 0.8)",
    boardOrientation: "white" as const,
    showBoardNotation: true,
    customNotationStyle: {
      color: '#654321',
      fontWeight: 'bold' as const,
      fontSize: '12px',
    },
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-2 text-white">
        <p className="text-sm font-bold">
          Turn: {game.turn() === 'w' ? 'White' : 'Black'}
        </p>
        <p className="text-xs text-gray-300">
          Position: {game.fen().split(' ')[0]} {/* Show just the piece positions part of FEN */}
        </p>
      </div>
      
      {/* @ts-ignore - Temporary workaround for type issues */}
      <ReactChessboard {...chessboardProps} />
      
      <button 
        className="rounded-lg p-2 bg-yellow-900 hover:bg-yellow-800 text-white mt-4 w-full transition-colors"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}