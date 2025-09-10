'use client'
import { useCallback, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

type PieceDropHandlerArgs = {
  sourceSquare: string;
  targetSquare: string;
  piece: string;
};

const GameControls = () => (
  <div className="bg-chess-navs p-4 rounded-lg">
    <h2 className="text-xl font-bold text-white mb-2">Game Controls</h2>
    <div className="flex gap-2">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        New Game
      </button>
      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
        Undo Move
      </button>
    </div>
  </div>
);

const MoveHistory = () => (
  <div className="bg-chess-navs p-4 rounded-lg">
    <h2 className="text-xl font-bold text-white mb-2">Move History</h2>
    <div className="bg-chess-cards p-2 rounded text-gray-300 h-40 overflow-y-auto">
      <p className="text-sm">Move history will appear here</p>
    </div>
  </div>
);

export default function ChessPracticePage() {
  const chessGameRef = useRef<Chess>(new Chess());
  const [fen, setFen] = useState(chessGameRef.current.fen());
  const [moves, setMoves] = useState<string[]>([]);

  const onPieceDrop = useCallback(({ sourceSquare, targetSquare }: PieceDropHandlerArgs) => {
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
      setMoves(prev => [...prev, move.san]);
      
      // Make a random move for the opponent
      setTimeout(() => {
        const gameCopy = new Chess(chessGameRef.current.fen());
        const possibleMoves = gameCopy.moves();
        
        if (possibleMoves.length > 0 && !gameCopy.isGameOver()) {
          const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
          gameCopy.move(randomMove);
          chessGameRef.current = gameCopy;
          setFen(gameCopy.fen());
          setMoves(prev => [...prev, randomMove]);
        }
      }, 500);

      return true;
    } catch (e) {
      console.error('Invalid move:', e);
      return false;
    }
  }, []);

  const resetGame = useCallback(() => {
    chessGameRef.current = new Chess();
    setFen(chessGameRef.current.fen());
    setMoves([]);
  }, []);

  return (
    <div className="min-h-screen bg-chess-bg text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Chess Practice</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="w-full max-w-lg mx-auto">
              <div style={{ width: '600px', margin: '0 auto' }}>
                <Chessboard 
                  position={fen}
                  onPieceDrop={onPieceDrop}
                  boardWidth={600}
                  customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                  }}
                  customDarkSquareStyle={{ backgroundColor: '#779556' }}
                  customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-chess-navs p-4 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-2">Game Controls</h2>
              <div className="flex gap-2">
                <button 
                  onClick={resetGame}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  New Game
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                  Undo Move
                </button>
              </div>
            </div>
            
            <div className="bg-chess-navs p-4 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-2">Move History</h2>
              <div className="bg-chess-cards p-2 rounded text-gray-300 h-40 overflow-y-auto">
                {moves.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1">
                    {moves.map((move, index) => (
                      <div key={index} className="text-sm">
                        {index % 2 === 0 ? `${Math.floor(index / 2) + 1}.` : ''} {move}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm">No moves yet. Make the first move!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}