'use client'
import {CheckSquare2Icon, Menu} from 'lucide-react'

import { useEffect, useState } from 'react';

import ChessGame from '../components/Chessboard'
import ProfileIcon from '../components/profileIcon';
import CountryFlagIcon from '../components/flagIcons';
import { UserProfileResponse } from '../api/users';
import ProtectedRoute from '../components/protectedRoute';
import Header from '../components/header';
import NavBar from '../components/navBar';



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



function ChessMatch() {

    // define data points for storing states and data here
    const [userData , setUserData] = useState<UserProfileResponse | null>(null) // default to null for before loading
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        setLoading(false);
        },[])

    if (loading) {
        return(
            <div className = 'min-h-screen bg-white'>
                <div className = "text-black font-bold">loading</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col gap-4 px-1" style={{backgroundImage: "url('/dark_mapple.png')"}}>
            {/* the navbar part at the top */}
            <div className = "sticky z-10 ">
                <Header/>
                <div className = "text-white flex p-2 gap-4 items-center">
                    <Menu size = {26}/> {/* later on impement an onclick functionality for this where it changes to x when clicked */}
                    <h1 className = "text-lg font-bold tracking-wide">chess_matches</h1>
                </div>
            </div>
            {/* opponent title and timer */}
            <div className = "bg-yellow-900 bg-opacity-70 backdrop-blur-sm shadow-lg rounded-lg py-3 flex items-center justify-between pr-4">
                <div className = "flex p-2 gap-2 items-center">
                    <ProfileIcon width={40}/>
                    <div className = "flex flex-col ">
                        <h2 className ="text-white text-lg font-bold ">{OpponentData.username}</h2>
                        <div className = "flex px-2 gap-2 items-center">
                            <h2 className = "text-white font-medium">{OpponentData.ranking}</h2>
                            <CountryFlagIcon code = {OpponentData.country_code} size={13}/>
                        </div>
                    </div>
                </div>
                {/* opponent timer : make this component reusable later on*/}
                <div>
                    <div className = "bg-yellow-950 bg-opacity-70 p-4 rounded-lg border border-gray-500">
                        <h1 className = "text-white text-2xl font-bold">{OpponentData.time}</h1>
                    </div>
                </div>
            </div>
            {/* the chessborad now  */}
            <div className = "shadow-2xl">
                <ChessGame/>
            </div>
            {/* native user status and time make this component reusable later on */}
            <div className = "bg-yellow-900 bg-opacity-70 backdrop-blur-sm shadow-lg rounded-lg flex items-center justify-between pr-4">
                <div className = "flex p-2 gap-2 items-center">
                    <ProfileIcon width={40}/>
                    <div className = "flex flex-col">
                        <h2 className ="text-white text-lg font-bold  ">{UserData.username}</h2>
                        <div className = "flex px-2 gap-2 items-center">
                            <h2 className = "text-white font-medium">{UserData.ranking}</h2>
                            <CountryFlagIcon code = {UserData.country_code} size={13}/>
                        </div>
                    </div>
                </div>
                {/* opponent timer : make this component reusable later on*/}
                <div>
                    <div className = "bg-yellow-950 bg-opacity-70 p-4 rounded-lg border border-gray-500">
                        <h1 className = "text-white text-2xl font-bold">{UserData.time}</h1>
                    </div>
                </div>
            </div>
            <div className = "sticky z-10">
                <NavBar/>
            </div>
            
        </div>
    )
}

export default function ChessMatchPage() {
    return (
        <ProtectedRoute>
            <ChessMatch/>
        </ProtectedRoute>
    )
}
// note : in typescript tsx all componet names must start with an uppercase letter