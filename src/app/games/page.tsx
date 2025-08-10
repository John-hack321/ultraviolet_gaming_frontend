'use client'
import Header from "../components/header"
import NavBar from "../components/navBar"
import ProtectedRoute from "../components/protectedRoute"
import { Play } from 'lucide-react'
import { useRouter } from "next/navigation"

function GamesContent() { 

    const router = useRouter(); // we do this in order to allow us to navigate the webiste programatically
    const handleNewChessMatchButtonClick = () => {
        console.log('the new chess match button has been clicked')
        // i guess when this button is clicked we wanna redirect to the chess match interface
        router.push('/chess_abilities/chessGameSelections')
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
                <Header />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 flex flex-col gap-6">
                {/* Title Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6 ">
                    <h1 className="text-gray-900 text-2xl font-bold mb-2">Play Games Online</h1>
                    <p className="text-gray-600">Choose a game and start playing</p>
                </div>

                {/* Chess Game Card */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="text-center">
                        <h2 className="text-gray-900 text-xl font-semibold mb-4">Chess Match</h2>
                        
                        {/* Chess Board Image */}
                        <div className="mb-6">
                            <img 
                                src="/chess_board.png" 
                                alt="Chess Board" 
                                className="w-full max-w-sm mx-auto rounded-lg shadow-md" 
                            />
                        </div>
                        
                        {/* Game Description */}
                        <p className="text-gray-600 mb-6">
                            Challenge players worldwide in strategic chess battles
                        </p>
                        
                        {/* Start Game Button */}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto"
                        onClick={handleNewChessMatchButtonClick}>
                            <Play size={20} className="mr-2" />
                            Start New Game
                        </button>
                    </div>
                </div>
                {/* checkers game card */}
                <div className = "bg-white rounded-lg shadow-sm border p-6">
                    <div className = "text-center">
                        <h2 className = "text-gray-900 text-xl font-semibold mb-4">Checkers Match</h2>
                        
                        <div className = "mb-6">
                            <img src="/checkers.png"
                             alt="" 
                             className = "w-full max-w-sm mx-auto rounded-lg shadow-md-lg"/>
                        </div>
                        {/* paragraph for game description */}
                        <p className="text-gray-600 mb-6">
                            Challenge players worldwide in strategic checkers battles
                        </p>
                         {/* Start Game Button */}
                         <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto">
                            <Play size={20} className="mr-2" />
                            Start New Game
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200">
                <NavBar bg="white" textColor="text-black"/>
            </div>
        </div>
    )
}

function Games() {
    return (
        <ProtectedRoute>
            <GamesContent />
        </ProtectedRoute>
    )
}

export default Games