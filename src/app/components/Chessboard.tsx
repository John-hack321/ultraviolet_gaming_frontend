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
  // const [game] = useState(new Chess()); // this defines the board state in string format // but we now need to make it mutable for proper updating of the game state and all .
  const [game , setGame] = useState(new Chess())
  const [position, setPosition] = useState(game.fen()); // this returns the board state but now in the fen format 

  // below we use move which is a function provided by the chess.js library as we had intantiated game from chess here : => const [game] = useState(new chess()) : and bytheway this game varibale is imutable as it does not give a setgame method 
  const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {

    // im being advised for better state management i should use a copy of the game and only update when a move is valid 

    const gameCopy = new Chess(game.fen())

    try {
      console.log('you have just called the gameCopy function')
      const move = gameCopy.move({
        from : sourceSquare,
        to : targetSquare,
        promotion : 'q',
      })

      console.log('you are trying to move the chesspeice from sourcesquare to targetsquare')
      console.log(`move object : ${move}`)

      if (move === null) {
        console.log(`invalid attempt to move peice from ${sourceSquare} to ${targetSquare}`)
        return false;
      }

      setGame(gameCopy)
      setPosition(gameCopy.fen())

      console.log('that was a valid move')
      console.log(`the current position is now ${position}`)

      if (gameCopy.isCheckmate()){
        console.log('checkmate'); // we will setup this reset game in a better way soon
        resetGame()
      }else if (gameCopy.isDraw()){
        console.log('the game has ended in a draw')
        resetGame() // we will setup this reset game in a better way soon
      }else if (gameCopy.isCheck()){
        console.log('check!')
      }

      return true;

    }
    catch(error){
      console.log('there was an error doing the move operartion : ' , error)
      return false;
    }
   
  };

  { /* this reset game function is good when testing so lets just put it here i will find its use later on */}
  const resetGame = () => {
    const newGame = new Chess()
    setGame(newGame);
    setPosition(newGame.fen());
    console.log('the game has succesfuly been reset')
  }

  // Custom square styles for wooden texture
  const customSquareStyles: { [key: string]: CSSProperties } = {};

  // Generate styles for all squares
  // this here is just for the custom squares what we are trying to do is to iterate throught the squares and applie the relevant styles 
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const file = String.fromCharCode(97 + j); // a-h
      const rank = 8 - i; // 8-1
      const square = `${file}${rank}` as Square;
      const isLight = (i + j) % 2 === 0;

      customSquareStyles[square] = {
        backgroundImage: isLight
          ? '/light_mapple.png'
          : '/dark_mapple.png',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
  }

  // Chessboard props with proper typing
  // and down here we just have the chess-board props that are required by the chessboard for functionality and styling 
  const chessboardProps = {
    position: position,
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
      <p className = "text-sm font-bold">
        Turn : {game.turn() === 'w' ? 'white' : 'black'}
      </p>
      {/* @ts-ignore - Temporary workaround for type issues */}
      <ReactChessboard {...chessboardProps} />
      <button 
      className = "rounded-lg p-2 bg-yellow-900 mt-4"
      onClick={resetGame}>
        ResetGame
      </button>
    </div>
  );
}