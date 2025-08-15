'use client';
import { useEffect, useMemo, useRef , useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, PieceDropHandlerArgs, SquareHandlerArgs } from "react-chessboard";
import { ChessEngineManager , EngineAnalysis } from "../chessConfigurations/chessConfig";
import { generateRandomMoveFen } from "../chessConfigurations/generalChessConfigs";
import Engine from "../engines/stockfish/engine";
import { useFormState } from "react-dom";

type Square = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' |
              'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8' |
              'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' |
              'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8' |
              'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8' |
              'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' |
              'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8' |
              'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';

export default function chessGame () {

  // new implementation with the new global chessEngine manager class

  // initialize the chess engine 
  const engine = useMemo(() => new Engine() , []);

  // store the eningine variables 
  const [positionEvaluation , setPositionEvaluation ] = useState(0);
  const [depth , setDepth] = useState(10);
  const [bestLine , setBestLine] = useState('');
  const [possibleMate , setPossibleMate] = useState('');


  {/* 
     const [analysis , setAnalysis] = useState<EngineAnalysis>({ // chess board initila starting state
    positionEvaluation : 0,
    possibleMate : null,
    bestLine : '',
    depth : 0,
    bestMove : null,
  })
 */}
  // initlize the data point to be used by the class , by starting with game start state
 
  // make the chessgame use useRef from react to always get the latest game state

  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current; 

  // when the game position changes find the bestmove
  useEffect (() => {
    if (!chessGame.isGameOver() || chessGame.isDraw()) {
      findBestMove();
    }
  }, [chessGame.fen()])

  function findBestMove() {
    engine.evaluatePosition(chessGame.fen() , 18) ;
    engine.onMessage(({
      positionEvaluation,
      possibleMate,
      pv,
      depth
    }) => {
      // ignore messages with a depth of less than 10
      if (depth && depth < 10 ) { 
        return ;
      }

      // update the position evaluation
      if (positionEvaluation) {
        setPositionEvaluation((chessGame.fen() === 'w' ? 1 : -1) * Number(positionEvaluation) / 1000);
      }

      // update the possible mate , depth and the 
      if (possibleMate) {
        setPossibleMate(possibleMate)
      }

      if (depth) {
        setDepth(depth);
      };

      if (pv) {
        setBestLine(pv);
      }
    });
  }

  // when using click to move we have to implement more states to track the state of the chessboard
  const [chessPosition , setChessPosition] = useState(chessGame.fen())
  const [moveFrom , setMoveFrom ] = useState('') // preset to an empty string
  const [optionSquares , setOptionSquares] = useState({});

  {/*
    useEffect below : 
    tracks the board state 
    */}
 

  // for now we are going to create automated chess for the opponent 
  const oponent = ""; // for now we will leave it blank and add more functionality later on

  // for the opponet random move 
  // for now we will use this simple one later on we will use advances such as using the stockfish api

  const handleRandomMove = () => {
    const newFen = generateRandomMoveFen(chessGame.fen())
    if (newFen) {
      setChessPosition(newFen);
    }
  }

  // a function for getting the valid moves for a squeare

  function getMoveOpetions (square : Square) {
    /*
    from what I think i know so far I think this function is for getthing the possible moves that a user can have and highlighting them on the board
    */
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
        background: chessGame.get(move.to) && chessGame.get(move.to)?.color !== chessGame.get(square)?.color ? 'radial-gradient(circle, rgba(0, 128, 0, 0.5) 85%, transparent 85%)' // larger circle for capturing
          : 'radial-gradient(circle, rgba(0, 128, 0, 0.5) 25%, transparent 25%)',
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

    // checking if the square clicked to move to is a valid move
    const moves = chessGame.moves({
      square : moveFrom as Square,
      verbose : true,
    });

    const foundMove = moves.find(m => m.from === moveFrom && m.to === square);
    if (!foundMove) {
      const hasMoveOptions = getMoveOpetions(square as Square);

      setMoveFrom(hasMoveOptions ? square : '');
      
      return;
    }
     // is normal move
    try {
      chessGame.move({
        from : moveFrom,
        to : square,
        promotion : 'q',
      });
    }catch (error) {
      // console.log(`an error occured : ${error}`)

      // if invalid getMove and setMoveOptions
      const hasMoveOptions = getMoveOpetions(square as Square)

      // if new piece , setMoveFrom otherwhise clear MoveFrom
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      return;
  }

  // update the board position
  setChessPosition(chessGame.fen())

  // make a reandom cpu move i believe for the opponent part
  setTimeout(handleRandomMove , 500)

  // then clear moveFrom and optionSquare
  setMoveFrom('');
  setOptionSquares({});

  // stop the current analysis and reset

  }

  // lets implement the functionality for only dragging a particular piece type 
  // allow white to only drag white pieces

  function canDragPieceWhite({piece} : PieceDropHandlerArgs) {
    return piece.pieceType[0] === 'w';
  }

  // and now for the black dragging functionality

  function canDragPieceBlack({piece} : PieceDropHandlerArgs) {
    return piece.pieceType[0] === 'b';
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
      });

      setPossibleMate('');

      // upon a successful move we set the update the chessgame status as always 
      setChessPosition(chessGame.fen());

      // stop the engine ( it will be restarted by the useEffect running findBestMove)
      engine.stop();

      // reset the best line 
      setBestLine('');

      // we then make the random oponent move
      // setTimeout(handleRandomMove,500 ) // we use the timeout to make the random move appear after some delay not just instant 

      // if the game is over we will return false
      if (chessGame.isGameOver() || chessGame.isDraw()) {
        return false;
      }
      // return true 
      return true;

    }catch (error) {
      console.log(`an error occured : ${error}`)
      return false;
    };

  }

  const bestMove = bestLine?.split(' ')?.[0];

  // create the props to pass the react-chessboard component
  {/* commentedd for testing in order to experiment with the options for bestmoves
  const chessboardOptions = {
      onPieceDrop,
      onSquareClick,
      position : chessPosition,
      squareStyles: optionSquares,
      id: 'play-vs-random-drag-drop' // note when wrirint css selectors avoid spaces to avoid making them selectors 
    }
      */}

  // new chessboard options 

  // we are now going to create chessboard options for both white and black perspectives
  // this is for the white peices
  const whiteChessboardOptions = {
    arrows: bestMove ? [{
      startSquare: bestMove.substring(0, 2) as Square,
      endSquare: bestMove.substring(2, 4) as Square,
      color: 'rgb(0, 128, 0)'
    }] : undefined,
    canDragPiece : canDragPieceWhite,
    onSquareClick,
    position: chessPosition,
    squareStyles : optionSquares,
    boardOrientation : 'white' as const,
    onPieceDrop,
    id: 'multiplayer-white'
  };

   // now the same but now for the black pieces
  const blackChessboardOptions = {
    arrows: bestMove ? [{
      startSquare: bestMove.substring(0, 2) as Square,
      endSquare: bestMove.substring(2, 4) as Square,
      color: 'rgb(0, 128, 0)'
    }] : undefined,
    canDragPiece : canDragPieceBlack, // this is native to type / color sensitive moves
    onSquareClick,
    position: chessPosition,
    squareStyles : optionSquares,
    boardOrientation : 'black' as const, // this is alose native to the type / color sensitive games
    onPieceDrop,
    id: 'multiplayer-black'
  };
 
    const chessboardOptions = {
    arrows: bestMove ? [{
      startSquare: bestMove.substring(0, 2) as Square,
      endSquare: bestMove.substring(2, 4) as Square,
      color: 'rgb(0, 128, 0)'
    }] : undefined,
    onSquareClick,
    position: chessPosition,
    squareStyles : optionSquares,
    onPieceDrop,
    id: 'analysis-board'
  };


    // and just like that i belive we will have create a fully functinal chessboard

  return (
    <div>
      <div>
        Position Evaluation:{' '}
        {possibleMate ? `#${possibleMate}` : positionEvaluation}
        {'; '}
        Depth: {depth}
        <div>
          Best line : <i>{bestLine.slice(0, 40)}</i>...
        </div>
        <Chessboard options = {chessboardOptions}/>
      </div>
    </div>
  )
}