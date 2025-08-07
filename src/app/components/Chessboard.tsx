'use client';
import { useRef , useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, PieceDropHandlerArgs, SquareHandlerArgs } from "react-chessboard";

type Square = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' |
              'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8' |
              'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' |
              'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8' |
              'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8' |
              'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' |
              'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8' |
              'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';

export default function chessGame () {

  // make the chessgame use useRef from react to always get the latest game state

  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current; 

  // when using click to move we have to implement more states to track the state of the chessboard
  const [chessPosition , setChessPosition] = useState(chessGame.fen())
  const [moveFrom , setMoveFrom ] = useState('') // preset to an empty string
  const [optionSquares , setOptionSquares] = useState({});

  // for now we are going to create automated chess for the opponent 
  const oponent = ""; // for now we will leave it blank and add more functionality later on

  // for the opponet random move 
  // for now we will use this simple one later on we will use advances such as using the stockfish api
  function makerandomMove() {
    const possibleMoves = chessGame.moves();
    // if chessgame is over finish game
    if (chessGame.isGameOver()) {
      console.log('game over')
      return ;
    }
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

    // we then make that random move
    chessGame.move(randomMove)

    // after moving the chesspeice we update the board state
    setChessPosition(chessGame.fen())

  }

  // a function for getting the valid moves for a squeare

  function getMoveOpetions (square : Square) {
    const moves = chessGame.moves({
      square,
      verbose : true,
    });

    // if there are no moves , clear the optionSquares 
    if (moves.length === 0) {
      setOptionSquares({});
      return false ;
    }

    // else we create a new object to store the optionsquares
    const newSquares : Record<string , React.CSSProperties> = {};

    // loop through the moves to and set the options squares
    for (const move of moves ) {
      newSquares[move.to] = {
        background: chessGame.get(move.to) && chessGame.get(move.to)?.color !== chessGame.get(square)?.color ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)' // larger circle for capturing
          : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
          // smaller circle for moving
          borderRadius : '50%'
      };
    }

    // we then set the square we wanna move from to yellow
    newSquares[square] = {
      background : 'rgba(255 , 255 , 0 , 0.4)'
    };

    // the set the optionSquares to the new squares 
    setOptionSquares(newSquares)

    // return true to show that are move squares 
    return true ;

  };

  function onSquareClick ({square , piece} : SquareHandlerArgs) {
    if (!moveFrom && piece) {
      // get the move options for the square
      const hasMoveOptions = getMoveOpetions(square as Square);
      // if move options , set the moveFrom to the square
      if (hasMoveOptions) {
        setMoveFrom(square)
      }

      return;
      
    }
  }

  // and now the onDrop prop piece handler
  function onPieceDrop({sourceSquare , targetSquare} : PieceDropHandlerArgs) {
    // prevent bad move such as moving a peice offbaord
    if (!targetSquare) {
      return false;
    }
    
    try {
      chessGame.move({
        from : sourceSquare,
        to : targetSquare ,
        promotion : 'q', // as said before for simplicity we now promote to queen first
      })

      // upon a successful move we set the update the chessgame status as always 
      setChessPosition(chessGame.fen());

      // we then make the random oponent move
      setTimeout(makerandomMove,500 ) // we use the timeout to make the random move appear after some delay not just instant 

      // return true 
      return true;


    }catch (error) {
      console.log(`an error occured : ${error}`)
      return false;
    };

  }

     // create the props to pass the react-chessboard component
     const chessboardOptions = {
      position : chessPosition,
      onPieceDrop,
      id : 'play-vs-random'
    }

    // and just like that i belive we will have create a fully functinal chessboard

  return (
    <div>
      <Chessboard options = {chessboardOptions}/>
    </div>
  )
}


// implementing the onClick functinality for the squares 