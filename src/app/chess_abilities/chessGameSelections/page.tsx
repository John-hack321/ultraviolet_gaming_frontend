'use client'
import HambagerMenu from "@/app/components/hamberger_menu"
import NavBar from "@/app/components/navBar"
import ProtectedRoute from "@/app/components/protectedRoute"

function ChessGameSelection () {
    return (
        <div className = "bg-chess-aesthetic-bg-brown flex flex-col min-h-screen">
            <div className = "flex py-4 px-2 gap-2 bg-chess-navs shadow-lg sticky top-0 z-10">
                <HambagerMenu/>
                <h1 className = "text-white font-bold">.Chess games</h1>
            </div>
            {/* main page cont will go here */}
            <div className = "flex-1 flex flex-col p-3 gap-4">
                {/* actual selections part */}
                <div className = "flex justify-center items-center p-4 gap-2 shadow-md bg-chess-navs">
                    {/* options div */}
                    <div className = "w-1/2 p-2 flex flex-col gap-2">
                        {/* play a game */}
                        <div className = "p-3 shadow-md rounded-md bg-chess-cards">
                            <h2>New game</h2>
                        </div>
                        {/* play agains bots */}
                        <div className = "p-3 shadow-md rounded-md bg-chess-cards">
                            <h2>Play bots</h2>
                        </div>
                        {/* play a friend online */}
                        <div className = "p-3 rounded-md shadow-md bg-chess-cards">
                            <h2>Play a friend</h2>
                        </div>
                    </div>
                    {/* chessboard div */}
                    <div>
                        <img src="/chess_board.png" 
                        alt="" 
                        className = "rounded-lg w-40"/>
                    </div>
                </div>
                {/* the puszzles part will go here */}
                <div className = "rounded-lg bg-chess-navs shadow-md flex p-2">
                    <div className = "flex flex-col gap-4 itmes-center p-2 w-full">
                        <h2 className = "text-center">Play chess puzzles</h2>
                        <img src="/chess_puzzle.png"
                        alt=""
                        className = "rounded-lg  w-full " />
                        <button className = "bg-chess-edge-color rounded-lg p-2 text-chess-aesthetic-bg-brown font-bold">
                            New puzzle
                        </button>
                    </div>
                </div>
                 {/* game history will go here */}
                 <div className = "bg-chess-navs rounded-md p-5">
                    <div className = "">
                        <h1>this is the games history part</h1>
                    </div>
                </div>
            </div>
            <div className = 'sticky z-10 bottom-0'>
                <NavBar textColor="white" bg = "native-brown"/>
            </div>
        </div>
    )
}

export default function ChessGameSelectionPage() {
    return (
        <ProtectedRoute>
            <ChessGameSelection/>
        </ProtectedRoute>
    )
}