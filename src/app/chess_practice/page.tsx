'use client'
import { useEffect, useMemo, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard";
import Engine from "../chess_abilities/engines/stockfish/engine";

export default function ChessPracticePage() {
    const engine = useMemo(() => new Engine(), []);
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;

    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [positionEvaluation, setPositionEvaluation] = useState(0);
    const [depth, setDepth] = useState(0);
    const [bestLine, setBestLine] = useState('');
    const [possibleMate, setPossibleMate] = useState('');
    const [moves, setMoves] = useState<string[]>([]);

    useEffect(() => {
        if (!chessGame.isGameOver()) {
            findBestMove();
        }
    }, [chessGame.fen()]);

    function findBestMove() {
        engine.evaluatePosition(chessGame.fen(), 18);
        engine.onMessage(({ positionEvaluation, possibleMate, pv, depth }) => {
            if (depth && depth < 10) return;
            if (positionEvaluation) {
                const evalValue = (chessGame.turn() === 'w' ? 1 : -1) * Number(positionEvaluation) / 100;
                setPositionEvaluation(evalValue);
            }
            if (possibleMate) setPossibleMate(possibleMate);
            if (depth) setDepth(depth);
            if (pv) setBestLine(pv);
        });
    }

    function makeAImove() {
        const bestMove = bestLine?.split(' ')?.[0];
        if (bestMove) {
            const from = bestMove.substring(0, 2);
            const to = bestMove.substring(2, 4);
            const move = chessGame.move({ from, to, promotion: 'q' });
            if (move) {
                setChessPosition(chessGame.fen());
                setMoves(prev => [...prev, move.san]);
            }
        }
    }

    const onPieceDrop = (args: PieceDropHandlerArgs) => {
        if (!args.targetSquare) return false;
        try {
            const move = chessGame.move({
                from: args.sourceSquare,
                to: args.targetSquare,
                promotion: 'q',
            });

            if (!move) return false;

            setChessPosition(chessGame.fen());
            setMoves(prev => [...prev, move.san]);
            engine.stop();
            setBestLine('');
            setPossibleMate('');

            if (!chessGame.isGameOver()) {
                setTimeout(makeAImove, 500);
            }
            return true;
        } catch (error) {
            console.log(`Move failed: ${error}`);
            return false;
        }
    };

    const AnalysisPanel = () => (
        <div className="bg-chess-navs p-4 rounded-lg space-y-2">
            <h3 className="font-bold text-white text-lg">Engine Analysis</h3>
            <div className="text-white">Evaluation: {possibleMate ? `#${possibleMate}` : positionEvaluation.toFixed(2)}</div>
            <div className="text-gray-400">Depth: {depth}</div>
            <div className="text-gray-400 truncate">Best Line: {bestLine}</div>
        </div>
    );

    const GameControls = () => (
        <div className="bg-chess-navs p-4 rounded-lg space-y-2">
            <h3 className="font-bold text-white">Controls</h3>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { chessGame.reset(); setChessPosition(chessGame.fen()); setMoves([]); }} className="p-2 bg-chess-icons-orange rounded-lg text-black font-semibold">New Game</button>
                <button onClick={() => { chessGame.undo(); chessGame.undo(); setChessPosition(chessGame.fen()); setMoves(m => m.slice(0, -2)); }} className="p-2 bg-gray-600 rounded-lg text-white font-semibold">Undo</button>
            </div>
        </div>
    );

    const MoveHistory = () => (
        <div className="bg-chess-navs p-4 rounded-lg flex-grow">
            <h3 className="font-bold text-white mb-2">Move History</h3>
            <div className="bg-chess-cards p-2 rounded-md h-48 overflow-y-auto text-white">
                {moves.length === 0 ? (
                    <p className="text-gray-400">No moves yet.</p>
                ) : (
                    <ol className="list-decimal list-inside grid grid-cols-2 gap-x-4">
                        {moves.map((move, index) => <li key={index}>{move}</li>)}
                    </ol>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-chess-aesthetic-bg-brown p-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-2/3 flex items-center justify-center">
                        <Chessboard
                            position={chessPosition}
                            onPieceDrop={onPieceDrop}
                            id="practice-chessboard"
                        />
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col gap-4">
                        <AnalysisPanel />
                        <GameControls />
                        <MoveHistory />
                    </div>
                </div>
            </div>
        </div>
    );
}