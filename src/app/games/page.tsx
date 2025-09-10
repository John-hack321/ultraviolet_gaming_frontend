'use client'
import Header from "../components/header";
import NavBar from "../components/navBar";
import ProtectedRoute from "../components/protectedRoute";
import { Play, Gamepad2 } from 'lucide-react';
import { useRouter } from "next/navigation";

const GameCard = ({ title, imageUrl, description, onPlay, comingSoon = false }: any) => (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${comingSoon ? 'opacity-50' : ''}`}>
        <div className="text-center">
            <h2 className="text-gray-900 text-xl font-semibold mb-4">{title}</h2>
            <div className="mb-6 h-48 flex items-center justify-center">
                <img 
                    src={imageUrl} 
                    alt={`${title} Board`} 
                    className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                />
            </div>
            <p className="text-gray-600 mb-6 h-12">{description}</p>
            <button 
                className={`bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto ${comingSoon ? 'cursor-not-allowed bg-gray-400' : ''}`}
                onClick={onPlay}
                disabled={comingSoon}
            >
                {comingSoon ? <Gamepad2 size={20} className="mr-2" /> : <Play size={20} className="mr-2" />}
                {comingSoon ? 'Coming Soon' : 'Start New Game'}
            </button>
        </div>
    </div>
);

function GamesContent() { 
    const router = useRouter();
    const handleNewChessMatchButtonClick = () => {
        router.push('/chess_abilities/chessGameSelections');
    };

    const games = [
        { 
            title: "Chess Match", 
            imageUrl: "/chess_board.png", 
            description: "Challenge players worldwide in strategic chess battles.", 
            onPlay: handleNewChessMatchButtonClick 
        },
        { 
            title: "Checkers Match", 
            imageUrl: "/checkers.png", 
            description: "A classic strategy game. Outwit your opponent to capture all their pieces.", 
            comingSoon: true 
        },
        { 
            title: "PUBG", 
            imageUrl: "/cod.png", 
            description: "Drop into a battle royale and fight to be the last one standing.", 
            comingSoon: true 
        },
        { 
            title: "COD", 
            imageUrl: "/cod2.png", 
            description: "Experience intense, fast-paced multiplayer combat.", 
            comingSoon: true 
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="sticky top-0 z-10 bg-white shadow-sm"><Header /></div>

            <div className="flex-1 container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h1 className="text-gray-900 text-2xl font-bold mb-2">Play Games Online</h1>
                    <p className="text-gray-600">Choose a game and start playing, or see what's coming next.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map(game => <GameCard key={game.title} {...game} />)}
                </div>
            </div>

            <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200">
                <NavBar bg="white" textColor="text-black"/>
            </div>
        </div>
    );
}

export default function Games() {
    return (
        <ProtectedRoute>
            <GamesContent />
        </ProtectedRoute>
    );
}
