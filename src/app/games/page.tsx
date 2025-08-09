'use client'
import Head from "next/head"
import Header from "../components/header"
import NavBar from "../components/navBar"

export default function() {
    return (
        <div className = 'min-h-screen bg-white flex flex-col justify-between'>
            <Header/>
            <div className = "text-black">
                <div>
                    <h1 className="text-black font-bold">Play games online</h1>
                    <div>
                        {/* chess match component */}
                        <div className = "w-full border shadow rounded-lg mx-2 flex flex-col justify-center p-2">
                            <h4 className = "text-sm">play a chess match</h4>
                            <img src="/chess_board.png" alt="" className="w-80 h-50" />
                            <div>
                                <button className = "text-black border rounded-lg p-2 mt-2">
                                    start a new game
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar/>
        </div>
    )
}