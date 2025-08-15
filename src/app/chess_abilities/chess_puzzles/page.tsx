'use client';
import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { PieceHandlerArgs, PieceDropHandlerArgs, PositionDataType, Chessboard } from "react-chessboard";
import ProtectedRoute from "@/app/components/protectedRoute";

type Square =
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8'
  | 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8'
  | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8'
  | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8'
  | 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8'
  | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8'
  | 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';

function ChessPositions() {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [position, setPosition] = useState({
    a4: { pieceType: 'bR' },
    c4: { pieceType: 'bK' },
    e4: { pieceType: 'bN' },
    d3: { pieceType: 'bP' },
    f3: { pieceType: 'bQ' },
    c2: { pieceType: 'wN' },
    d2: { pieceType: 'wQ' },
    b1: { pieceType: 'wN' }
  } as PositionDataType);

  useEffect(() => {
    const e1 = document.getElementById('mini-puzzles-square-e1');
    const f1 = document.getElementById('mini-puzzles-square-f1');
    if (e1) e1.style.display = 'none';
    if (f1) f1.style.display = 'none';
  }, []);

  const moves = [
    { sourceSquare: 'd2', targetSquare: 'c3' },
    { sourceSquare: 'e4', targetSquare: 'c3' },
    { sourceSquare: 'b1', targetSquare: 'd2' },
  ];

  function onPieceDrop({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs) {
    const requiredMove = moves[currentMoveIndex];

    if (requiredMove.sourceSquare !== sourceSquare || requiredMove.targetSquare !== targetSquare) {
      return false;
    }

    const newPosition = { ...position };
    newPosition[targetSquare] = { pieceType: piece.pieceType };
    delete newPosition[sourceSquare];
    setPosition(newPosition);
    setCurrentMoveIndex(prev => prev + 1);

    const makeCpuMove = () => {
      const nextMoveIndex = currentMoveIndex + 1;
      if (nextMoveIndex < moves.length) {
        const move = moves[nextMoveIndex];
        const updatedPosition = { ...newPosition };
        updatedPosition[move.targetSquare] = {
          pieceType: updatedPosition[move.sourceSquare].pieceType
        };
        delete updatedPosition[move.sourceSquare];
        setPosition(updatedPosition);
        setCurrentMoveIndex(nextMoveIndex + 1);
      }
    };

    setTimeout(makeCpuMove, 200);
    return true;
  }

  function canDragPiece({ piece }: PieceHandlerArgs) {
    return piece.pieceType[0] === 'w';
  }

  const chessboardOptions = {
    canDragPiece,
    onPieceDrop,
    chessboardRows: 4,
    chessboardColumns: 6,
    position,
    id: 'mini-puzzles'
  };

  return (
    <div>
      <div>
        <Chessboard options={chessboardOptions} />
      </div>
    </div>
  );
}


export default function PuzzlePage () {
  return (
    <ProtectedRoute>
      <ChessPositions/>
    </ProtectedRoute>
  )
}