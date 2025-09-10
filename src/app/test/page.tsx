{/*'use client'

import { useCallback, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

type PieceDropHandlerArgs = {
  sourceSquare: string;
  targetSquare: string;
  piece: string;
};

export default function TestPage() {
  const chessGameRef = useRef(new Chess());
  const [fen, setFen] = useState(chessGameRef.current.fen());

  const onPieceDrop = useCallback(({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string }) => {
    const gameCopy = new Chess(chessGameRef.current.fen());
    
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (!move) return false;

      chessGameRef.current = gameCopy;
      setFen(gameCopy.fen());
      
      // Make a random move for the opponent
      setTimeout(() => {
        const gameCopy = new Chess(chessGameRef.current.fen());
        const possibleMoves = gameCopy.moves();
        
        if (possibleMoves.length > 0 && !gameCopy.isGameOver()) {
          const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
          gameCopy.move(randomMove);
          chessGameRef.current = gameCopy;
          setFen(gameCopy.fen());
        }
      }, 300);

      return true;
    } catch (e) {
      console.error('Invalid move:', e);
      return false;
    }
  }, []);

  const boardProps = {
    position: fen,
    onPieceDrop,
    boardWidth: 600,
    customBoardStyle: {
      borderRadius: '4px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
    },
    customDarkSquareStyle: { backgroundColor: '#779556' },
    customLightSquareStyle: { backgroundColor: '#ebecd0' }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-4">
        <div style={{ width: '600px', margin: '0 auto' }}>
          <Chessboard options={boardProps}/>
        </div>
      </div>
    </div>
  );
}*/}