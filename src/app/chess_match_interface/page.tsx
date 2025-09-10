'use client'
import HambagerMenu from '../components/hamberger_menu';
import { useEffect, useState } from 'react';
import ChessGame from '../chess_abilities/chess_components/Chessboard';
import ProfileIcon from '../components/profileIcon';
import CountryFlagIcon from '../components/flagIcons';
import { UserProfileResponse } from '../api/users';
import ProtectedRoute from '../components/protectedRoute';
import NavBar from '../components/navBar';

const OpponentData = { username: "Opponent", ranking: 150, country_code: "KE", time: '10:00' };
const UserData = { username: "JohnKingChessLord", ranking: 150, country_code: "KE", time: '10:00' };

function ChessMatch() {
    const [userData, setUserData] = useState<UserProfileResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-chess-aesthetic-bg-brown'>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-chess-aesthetic-bg-brown flex flex-col">
            <div className="sticky top-0 z-10 shadow-lg bg-chess-navs">
                <div className="flex items-center px-4 py-3 border-b border-chess-cards">
                    <HambagerMenu />
                    <h1 className="text-lg font-semibold text-white">Chess Match</h1>
                </div>
            </div>

            <div className="flex-1 container mx-auto p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-2/3 flex flex-col gap-4">
                        <div className="rounded-lg shadow-lg border p-4 bg-chess-cards border-chess-navs">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-orange-500 rounded-full p-2"><ProfileIcon width={32} /></div>
                                    <div>
                                        <h2 className="text-white font-bold text-lg">{OpponentData.username}</h2>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-orange-300 font-semibold">{OpponentData.ranking}</span>
                                            <CountryFlagIcon code={OpponentData.country_code} size={14} />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-lg px-4 py-3 border-2 border-orange-400 bg-chess-navs">
                                    <span className="text-orange-300 text-xl font-mono font-bold">{OpponentData.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg shadow-lg border p-2 bg-chess-cards border-chess-navs">
                            <ChessGame />
                        </div>

                        <div className="rounded-lg shadow-lg border p-4 bg-chess-cards border-chess-navs">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-orange-500 rounded-full p-2"><ProfileIcon width={32} /></div>
                                    <div>
                                        <h2 className="text-white font-bold text-lg">{UserData.username}</h2>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-orange-300 font-semibold">{UserData.ranking}</span>
                                            <CountryFlagIcon code={UserData.country_code} size={14} />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-lg px-4 py-3 border-2 border-orange-400 bg-chess-navs">
                                    <span className="text-orange-300 text-xl font-mono font-bold">{UserData.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        <div className="bg-chess-navs p-4 rounded-lg space-y-4 flex-grow">
                            <h3 className="font-bold text-white text-lg">Match Info</h3>
                            <div className="bg-chess-cards p-2 rounded-md flex-grow h-48 overflow-y-auto">
                                <p className="text-gray-400">Move history will appear here.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="p-2 bg-gray-600 rounded-lg text-white font-semibold">Offer Draw</button>
                                <button className="p-2 bg-red-700 rounded-lg text-white font-semibold">Resign</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 z-10">
                <NavBar classname='bg-chess-navs text-white' />
            </div>
        </div>
    );
}

export default function ChessMatchPage() {
    return (
        <ProtectedRoute>
            <ChessMatch />
        </ProtectedRoute>
    );
}