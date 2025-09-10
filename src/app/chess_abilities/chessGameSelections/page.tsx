'use client'
import HambagerMenu from "@/app/components/hamberger_menu";
import NavBar from "@/app/components/navBar";
import ProtectedRoute from "@/app/components/protectedRoute";
import { useRouter } from "next/navigation";

function ChessGameSelection() {
    const router = useRouter();

    const handleNewGameClick = () => {
        router.push('/chess_match_interface');
    };

    const handlePuzzleButtonClick = () => {
        router.push('/chess_abilities/chess_puzzles');
    };

    return (
        <div className="bg-chess-aesthetic-bg-brown flex flex-col min-h-screen">
            <div className="flex py-4 px-4 gap-2 bg-chess-navs shadow-lg sticky top-0 z-10">
                <HambagerMenu />
                <h1 className="text-white font-bold text-lg">Play Chess</h1>
            </div>

            <div className="flex-1 bg-chess-navs p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 bg-chess-navs rounded-lg shadow-md p-4">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <div className="w-full sm:w-1/2 flex flex-col gap-3">
                                <button className="p-3 shadow-md rounded-lg bg-chess-edge-color text-chess-aesthetic-bg-brown font-bold transition-transform hover:scale-105" onClick={handleNewGameClick}>
                                    Play New Game
                                </button>
                                <button className="p-3 shadow-md rounded-lg bg-chess-edge-color text-chess-aesthetic-bg-brown font-bold transition-transform hover:scale-105">
                                    Play vs Bot
                                </button>
                                <button className="p-3 bg-chess-edge-color rounded-lg shadow-md text-chess-aesthetic-bg-brown font-bold transition-transform hover:scale-105">
                                    Play a Friend
                                </button>
                            </div>
                            <div className="w-full sm:w-auto">
                                <img src="/chess_board.png" alt="Chessboard" className="rounded-lg w-40 mx-auto" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-chess-navs rounded-lg shadow-md flex flex-col p-4 gap-4 items-center">
                        <h2 className="text-center text-white text-xl font-semibold">Puzzles</h2>
                        <img src="/chess_puzzle.png" alt="Chess Puzzle" className="rounded-lg w-full max-w-xs" />
                        <button className="bg-chess-edge-color rounded-lg p-3 text-chess-aesthetic-bg-brown font-bold w-full max-w-xs transition-transform hover:scale-105" onClick={handlePuzzleButtonClick}>
                            Start Puzzle
                        </button>
                    </div>

                    <div className="bg-chess-navs rounded-lg shadow-md p-4">
                        <h2 className="text-center text-white text-xl font-semibold">Game History</h2>
                        <div className="mt-4 text-center text-gray-400">
                            <p>Your past games will be shown here.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='sticky z-10 bottom-0'>
                <NavBar classname="text-white bg-chess-navs" />
            </div>
        </div>
    );
}

export default function ChessGameSelectionPage() {
    return (
        <ProtectedRoute>
            <ChessGameSelection />
        </ProtectedRoute>
    );
}
