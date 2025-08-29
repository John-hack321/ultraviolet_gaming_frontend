'use client'
import {Chessboard, PieceDropHandlerArgs, PieceHandlerArgs} from "react-chessboard"
import { Chess } from "chess.js"
import { useRef , useState , useMemo } from "react"
import { generateRandomMoveFen } from "../chess_abilities/chessConfigurations/generalChessConfigs"

type Square = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' |
              'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8' |
              'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' |
              'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8' |
              'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8' |
              'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' |
              'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8' |
              'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';


export default function twoPlayerChess () {

    const chessGameRef = useRef(new Chess())
    const chessGame = chessGameRef.current;

    const [chessPosition , setChessPosition] = useState(chessGame.fen());
    const [moveFrom , setMoveFrom] = useState('');
    const [optionSquares , setOptionSquares] = useState({});

    const handleRandomMove = () => {
        const newFen = generateRandomMoveFen(chessGame.fen())
        if (newFen) {
            chessGame.move(newFen);
            setChessPosition(newFen)
            return true;
        }else{
            console.log('the random move funtioin failed teribly')
            return false;
        }
    }

    function onPieceDrop ( {sourceSquare , targetSquare} : PieceDropHandlerArgs)  {
        if (!targetSquare) {
            return false;
        }

        try {
            chessGame.move({
                from : sourceSquare , 
                to : targetSquare , 
                promotion : 'q',
            })

            setChessPosition(chessGame.fen())
            return true;

        } catch (error) {
            console.log(`an error occured ${error}`)
            return false;
        }
    }

    function canDragPieceWhite({piece} : PieceHandlerArgs) {
        return piece.pieceType[0] === 'w';
      }

    function canDragPieceBlack ({piece} : PieceHandlerArgs) {
        return piece.pieceType[0] === 'b';
    }

    const whiteChessboardOptions = {
        onPieceDrop ,
        canDragPiece : canDragPieceWhite,
        boardOrientation : 'white' as const,
        position : chessPosition,
        id : 'mulitplayer-white'
    }

    const blackChessboardOptions = {
        onPieceDrop ,
        canDragPiece : canDragPieceBlack,
        boardOrientation : 'black' as const,
        position : chessPosition,
        id : 'mulitplayer-black'
    }

    return (
        <div className = "p-2 flex flex-col gap-2">
            <div className = "">
                <Chessboard options={whiteChessboardOptions}/>
            </div>
            <div>
                <Chessboard options={blackChessboardOptions}/>
            </div>
        </div>
    )
}