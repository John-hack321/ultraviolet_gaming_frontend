'use client'
import { useState , useEffect } from "react";
import { Chess } from "chess.js";
import { ChessboardOptions , PieceDropHandlerArgs , PositionDataType } from "react-chessboard";


type Square = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' |
              'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8' |
              'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' |
              'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8' |
              'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8' |
              'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' |
              'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8' |
              'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';


export default function ChessPositions () {

    const [currentIndex , setCurrentIndex] = useState(0);
    const [position , setPosition ] = useState({
        a4: {
          pieceType: 'bR'
        },
        c4: {
          pieceType: 'bK'
        },
        e4: {
          pieceType: 'bN'
        },
        d3: {
          pieceType: 'bP'
        },
        f3: {
          pieceType: 'bQ'
        },
        c2: {
          pieceType: 'wN'
        },
        d2: {
          pieceType: 'wQ'
        },
        b1: {
          pieceType: 'wN'
        }
      } as PositionDataType);

      // we will use the id of the square to only display potions of the chessboad to the user
      useEffect(() => {
        const e1 = document.getElementById('mini-puzzles-square-e1');
        const f1 = document.getElementById('mini-puzzles-square-f1');
        if (e1) {
          e1.style.display = 'none';
        }
        if (f1) {
          f1.style.display = 'none';
        }
      }, []);

      // moves for the puzzle

      const moves = [
        {
            sourceSquare : 'd2',
            targetSquare : 'c3',
    },
        {
            sourceSquare : 'e4', 
            targetSquare : 'c3',
        },
        {
            sourceSquare : 'b1', 
            targetSquare : 'd2',
        },

      ]
    

    return (
        <div>
            <div>this is just a test for this now</div>
        </div>
    );
}