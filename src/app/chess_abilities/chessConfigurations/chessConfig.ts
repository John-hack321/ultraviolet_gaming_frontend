'use client'
import Engine from "../engines/stockfish/engine";
import { Chess } from "chess.js";

{/* 
    this file contains the Reactchessboard-configuration functions
    everything from : onDrop to findBestMove are found here
    */}
// find best move function

 const [positionEvaluation , setPositionEvaluation] = useState(0); // default value of 0
  const [depth , setDepth] = useState(10); // a default depth of 10
  const [bestLine , setBestLine] = useState('');
  const [possibleMate



function findBestMove(  chessGame : Chess  , engine : Engine ) {
    engine.evaluatePosition(chessGame.fen() , 18)
    engine.onMessage(({
      positionEvaluation,
      possibleMate,
      pv,
      depth
    }) => {
      // ignore the messages with a depth of less than 10
      if (depth && depth < 10) {
        return;
      }

      // update the position evaluation accordingly
      if (positionEvaluation) {
        setPositionEvaluation((chessGame.turn() === 'w' ? 1 : -1) * Number(positionEvaluation) / 1000); // this line set the identifier fr the white or black pieces by asigning a number then gets the evaluation and multiplies with it
      };

      // update teh possibleMate , depth and bestline
      if (possibleMate) {
        setPossibleMate(possibleMate)
      };
      if (depth) {
        setDepth(depth)
      };
      if (pv) {
        setBestLine(pv);
      }
    });
  }


class chessEngineFunctionality {
    constructor () {

    }
}