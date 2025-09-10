'use client'
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard";
import { Chess } from "chess.js";
import { useRef, useState, useEffect } from "react";
import { socket } from "../test_socket_page/page";

interface Move {
    sid: string;
    move: string;
}

export default function TwoPlayerChess() {
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;

    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
    const [moves, setMoves] = useState<string[]>([]);

    useEffect(() => {
        const onConnect = () => setIsConnected(true);
        const onDisconnect = () => setIsConnected(false);
        const onMakeMove = (data: Move) => {
            try {
                const move = chessGame.move(data.move);
                if (move) {
                    setChessPosition(chessGame.fen());
                    setMoves(prevMoves => [...prevMoves, move.san]);
                } else {
                    console.error('Invalid move received:', data.move);
                }
            } catch (error) {
                console.error('Error applying received move:', error);
            }
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('make_move', onMakeMove);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('make_move', onMakeMove);
        };
    }, [chessGame]);

    const handleChessPieceMove = (moveNotation: string) => {
        socket.emit('make_move', moveNotation);
    };

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
            setMoves(prevMoves => [...prevMoves, move.san]);
            handleChessPieceMove(move.san);
            return true;
        } catch (error) {
            console.log(`Move failed: ${error}`);
            return false;
        }
    };

    const canDragPiece = ({ piece }: { piece: string }) => {
        return piece.startsWith(boardOrientation[0]);
    };

    const PlayerInfo = ({ name, isConnected }: { name: string, isConnected: boolean }) => (
        <div className="flex items-center justify-between p-4 bg-chess-cards rounded-lg">
            <p className="font-semibold text-white">{name}</p>
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>
    );

    const GameControls = () => (
        <div className="bg-chess-navs p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between text-white">
                <h3 className="font-bold">Game Controls</h3>
                <p>Status: {isConnected ? <span className="text-green-500">Connected</span> : <span className="text-red-500">Disconnected</span>}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')} className="p-2 bg-chess-icons-orange rounded-lg text-black font-semibold">Flip Board</button>
                <button className="p-2 bg-gray-600 rounded-lg text-white font-semibold">Resign</button>
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
                            onPieceDrop={onPieceDrop}
                            canDragPiece={canDragPiece}
                            boardOrientation={boardOrientation}
                            position={chessPosition}
                            id="two-player-chessboard"
                        />
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col gap-4">
                        <PlayerInfo name="Player 1 (You)" isConnected={isConnected} />
                        <PlayerInfo name="Player 2 (Opponent)" isConnected={isConnected} />
                        <GameControls />
                        <MoveHistory />
                    </div>
                </div>
            </div>
        </div>
    );
}
