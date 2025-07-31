'use client'
import {Menu} from 'lucide-react'

import ProfileIcon from '../components/profileIcon';
import CountryFlagIcon from '../components/flagIcons';
import ChessGame from '../components/Chessboard'


// for now we will hard code the opponent data and change this once we move to production
const OpponentData = {
    'username' : "Opponent",
    'ranking' : 150,
    'country_code' : "KE",
    'time' : '10 : 00'
}

const UserData = {
    'username' : "JohnKingChessLord",
    'ranking' : 150,
    'country_code' : "KE",
    'time' : '10 : 00'
}



function chess_match_page() {
    return (
        <div className = "min-h-screen bg-white">
            {/* the navbar part at the top */}
            <div className = "text-black flex p-2 gap-4">
                <Menu size = {26}/> {/* later on impement an onclick functionality for this where it changes to x when clicked */}
                <h1 className = "text-lg font-bold tracking-wide">chess_matches</h1>
            </div>
            {/* opponent title and timer */}
            <div className = "bg-green-200 flex items-center justify-between pr-4">
                <div className = "flex p-2 gap-2  itmes-center">
                    <ProfileIcon width={40}/>
                    <div className = "flex flex-col bg-red-200">
                        <h2 className ="text-black text-lg font-bold bg-blue-400 ">{OpponentData.username}</h2>
                        <div className = "flex px-2 gap-2 bg-yellow-300">
                            <h2 className = "text-black font-medium">{OpponentData.ranking}</h2>
                            <CountryFlagIcon code = {OpponentData.country_code} size={13}/>
                        </div>
                    </div>
                </div>
                {/* opponent timer : make this component reusable later on*/} 
                <div>
                    <div className = "bg-gray-300 p-4 rouned-lg border border-gray-300">
                        <h1 className = "text-black text-2xl font-bold">{OpponentData.time}</h1>
                    </div>
                </div>
            </div>
            {/* the chessborad now  */}
            <div>
                <ChessGame/>
            </div>
            {/* native user status and time make this component reusable later on */}
            <div className = "bg-green-200 flex items-center justify-between pr-4">
                <div className = "flex p-2 gap-2  itmes-center">
                    <ProfileIcon width={40}/>
                    <div className = "flex flex-col bg-red-200">
                        <h2 className ="text-black text-lg font-bold bg-blue-400 ">{UserData.username}</h2>
                        <div className = "flex px-2 gap-2 bg-yellow-300">
                            <h2 className = "text-black font-medium">{UserData.ranking}</h2>
                            <CountryFlagIcon code = {UserData.country_code} size={13}/>
                        </div>
                    </div>
                </div>
                {/* opponent timer : make this component reusable later on*/} 
                <div>
                    <div className = "bg-gray-300 p-4 rouned-lg border border-gray-300">
                        <h1 className = "text-black text-2xl font-bold">{OpponentData.time}</h1>
                    </div>
                </div>
            </div>
            {/* the other button for different stuff */}
            <div className = "">
                {/* first two buttons */}
                <div className = "flex p-3 gap-4 w-full">
                    <button className = "text-black bg-gray-600 p-2 text-sm rounded-lg items-center w-1/2 ">Play New Game</button>
                    <button className = "text-black bg-gray-600 p-2 text-sm rounded-lg items-center w-1/2"><ProfileIcon width={12}/>FindPlayers</button>
                </div>
                {/* the big button */}
                <div className = "w-full px-3">
                    <button className = "w-full rounded-lg bg-neutral-600 p-2 flex flex-col">
                        <span className='text-black'>Game type</span>
                        <span className = "text-green-500">Rapid <span className='text-white text-sm'>10 minute game</span></span>
                    </button>
                </div>
                {/* next two buttons */}
                <div className = "w-full px-3 mt-2 flex gap-4">
                    <button className='text-black bg-neutral-600 w-1/2 p-2 rounded-lg'>Play a friend</button>
                    <button className = "text-black rounded-lg w-1/2 bg-neutral-600 px-2 py-4">Tournaments</button>
                </div>
            </div>
            {/* profile thingy at the bottom */}
            <div className = "">
                <div className = "flex p-2 gap-2  itmes-center">
                        <ProfileIcon width={40}/>
                        <div className = "flex flex-col bg-red-200">
                            <h2 className ="text-green-900 text-sm font-bold bg-blue-400 ">Online</h2>
                            <div className = "flex px-2 gap-2 bg-yellow-300">
                                <h2 className = "text-black font-medium">2000  online</h2>
                                <CountryFlagIcon code = {UserData.country_code} size={13}/>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default chess_match_page;