'use client'
import React, { useState } from 'react';
import {
  Home, Gamepad2, Trophy, Users, Wallet, Settings, Bell, Search,
  TrendingUp, Clock, Target, Shield, Menu, X, LogOut, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '../components/protectedRoute';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const login_Data = localStorage.getItem('token')
  const payload = JSON.parse(atob(login_Data.split('.')[1]));
  const playerName = payload.sub

  const userData = {
    name: playerName,
    avatar: "/default-avatar.png",
    level: 1,
    totalEarnings: 0.00,
    winRate: 0,
    gamesPlayed: 0,
  };

  const gamesData = {
    chess: { name: 'Chess', icon: '♔', status: 'Live in Beta' },
    checkers: { name: 'Checkers', icon: '⚫', status: 'Coming Soon' },
    pubg: { name: 'PUBG', icon: '🎮', status: 'Coming Soon' },
    cod: { name: 'COD', icon: '💥', status: 'Coming Soon' },
  };

  const Sidebar = () => {
    const menuItems = [
      { id: 'overview', icon: <Home size={20} />, label: 'Overview', href: '/dashboard' },
      { id: 'games', icon: <Gamepad2 size={20} />, label: 'Games', href: '/games' },
      { id: 'tournaments', icon: <Trophy size={20} />, label: 'Tournaments', href: '/chess_puzzles' },
      { id: 'wallet', icon: <Wallet size={20} />, label: 'Wallet', href: '#' },
      { id: 'profile', icon: <Users size={20} />, label: 'Profile', href: '/profile' },
    ];

    return (
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 h-16 flex items-center border-b border-gray-700">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl text-white">.ULVT</div>
          </Link>
        </div>

        <div className="flex-1 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center gap-3 px-6 py-3 text-left transition-colors duration-200
                ${item.id === 'overview' 
                  ? 'bg-green-600/10 text-green-400 border-r-4 border-green-500' 
                  : 'text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <img src={userData.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover bg-gray-700"/>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="font-semibold text-white text-sm">{userData.name}</div>
                <div className="text-xs text-gray-400">Level {userData.level}</div>
              </div>
            )}
          </div>
          <Link href="/login" className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-300 hover:bg-gray-700 mt-4">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </Link>
        </div>
      </div>
    );
  };

  const Header = () => (
    <header className="bg-white border-b border-gray-200 px-6 py-3 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Dashboard Overview</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Search..." className="bg-gray-100 text-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-64"/>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">1</span>
        </button>
      </div>
    </header>
  );

  const StatsCard = ({ title, value, icon, color = "green" }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <div className={`text-${color}-600`}>{icon}</div>
        </div>
      </div>
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>

      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome, {userData.name}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatsCard title="Total Earnings" value={`$${userData.totalEarnings.toFixed(2)}`} icon={<TrendingUp size={24} />} color="green" />
              <StatsCard title="Win Rate" value={`${userData.winRate}%`} icon={<Target size={24} />} color="blue" />
              <StatsCard title="Games Played" value={userData.gamesPlayed} icon={<Gamepad2 size={24} />} color="purple" />
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Explore Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(gamesData).map(([key, game]) => (
                  <div key={key} className={`p-4 rounded-lg transition-colors group ${game.status.includes('Live') ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 cursor-not-allowed'}`}>
                    <div className="text-3xl mb-2">{game.icon}</div>
                    <div className="text-gray-800 font-medium">{game.name}</div>
                    <div className={`${game.status.includes('Live') ? 'text-green-600' : 'text-amber-600'} text-sm`}>{game.status}</div>
                    {game.status.includes('Live') && (
                      <Link href="/two_player" className="text-gray-800 font-bold mt-2 flex items-center gap-2 group-hover:text-green-600 transition-colors">
                        Play Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Matches</h2>
              <div className="text-center text-gray-500 py-8">
                <p>No matches played yet.</p>
                <Link href="/two_player" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-500 transition-colors">
                  Play Your First Game
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
