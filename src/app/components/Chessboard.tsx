'use client';
import { useRef , useState } from "react";
import { Chess } from "chess.js";
import { Chessboard , PieceDropHandlerArgs } from "react-chessboard";

export default function chessGame () {

  // make the chessgame use useRef from react to always get the latest game state

  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  // we then  setup somthing to track the positon of the chesspeices using useState(

  const [chessPosition , setChessPosition] = useState(chessGame.fen())

  // for now we are going to create automated chess for the opponent 
  const oponent = ""; // for now we will leave it blank and add more functionality later on

  // for the opponet random move 
  // for now we will use this simple one later on we will use advances such as using the stockfish api
  function makerandomMove() {
    const possibleMoves = chessGame.moves();
    // if chessgame is over finish game
    if (chessGame.isGameOver()) {
      return ;
    }
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

    // we then make that random move
    chessGame.move(randomMove)

    // after moving the chesspeice we update the board state
    setChessPosition(chessGame.fen())

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