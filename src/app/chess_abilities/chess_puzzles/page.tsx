'use client';
import { useState, useMemo } from "react";
import { Chess } from "chess.js";
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard";
import ProtectedRoute from "@/app/components/protectedRoute";

const puzzles = [
    {
        fen: 'r1b1k2r/pppp1ppp/2n5/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1B1K2R w KQkq - 0 6',
        solution: ['Nxe5', 'Nxe5', 'd4']
    },
    {
        fen: 'rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
        solution: ['Be3', 'Ng4', 'Bb5+']
    }
];

export default function PuzzlePage() {
    const [puzzleIndex, setPuzzleIndex] = useState(0);
    const [currentPuzzle, setPuzzle] = useState(puzzles[puzzleIndex]);
    const game = useMemo(() => new Chess(currentPuzzle.fen), [currentPuzzle]);
    const [position, setPosition] = useState(game.fen());
    const [status, setStatus] = useState('White to move.');
    const [moveIndex, setMoveIndex] = useState(0);

    const onPieceDrop = (args: PieceDropHandlerArgs) => {
        try {
            const requiredMove = currentPuzzle.solution[moveIndex];
            const move = game.move({ from: args.sourceSquare, to: args.targetSquare, promotion: 'q' });

            if (move === null || move.san !== requiredMove) {
                game.undo();
                setStatus('Incorrect move. Try again!');
                return false;
            }

            setPosition(game.fen());
            setMoveIndex(moveIndex + 1);
            setStatus('Correct!');

            if (moveIndex + 1 < currentPuzzle.solution.length) {
                setTimeout(() => {
                    const nextCpuMoveSan = currentPuzzle.solution[moveIndex + 1];
                    const cpuMove = game.move(nextCpuMoveSan);
                    if (cpuMove) {
                        setPosition(game.fen());
                        setMoveIndex(moveIndex + 2);
                        setStatus('Your turn.');
                    }
                }, 500);
            } else {
                setStatus('Puzzle completed!');
            }

            return true;
        } catch (e) {
            return false;
        }
    };

    const resetPuzzle = () => {
        game.load(currentPuzzle.fen);
        setPosition(game.fen());
        setMoveIndex(0);
        setStatus('White to move.');
    };

    const nextPuzzle = () => {
        const nextIndex = (puzzleIndex + 1) % puzzles.length;
        setPuzzleIndex(nextIndex);
        const newPuzzle = puzzles[nextIndex];
        setPuzzle(newPuzzle);
        game.load(newPuzzle.fen);
        setPosition(game.fen());
        setMoveIndex(0);
        setStatus('White to move.');
    };

    const PuzzleInfoPanel = () => (
        <div className="bg-chess-navs p-4 rounded-lg space-y-4">
            <h2 className="text-xl font-bold text-white">Chess Puzzles</h2>
            <div className="bg-chess-cards p-4 rounded-md text-center">
                <p className="text-lg text-white font-semibold">{status}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={resetPuzzle} className="p-2 bg-gray-600 rounded-lg text-white font-semibold">Reset</button>
                <button onClick={() => alert("Hint: Try to find the best tactical sequence!")} className="p-2 bg-gray-600 rounded-lg text-white font-semibold">Hint</button>
            </div>
            <button onClick={nextPuzzle} className="w-full p-2 bg-chess-icons-orange rounded-lg text-black font-semibold">Next Puzzle</button>
        </div>
    );

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-chess-aesthetic-bg-brown p-4">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-2/3 flex items-center justify-center">
                            <Chessboard
                                position={position}
                                onPieceDrop={onPieceDrop}
                                id="puzzle-chessboard"
                            />
                        </div>
                        <div className="w-full md:w-1/3 flex flex-col gap-4">
                            <PuzzleInfoPanel />
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
