'use client'
import Header from "../components/header";
import NavBar from "../components/navBar";
import { User, Plus, Trophy, Target, Star , Sword } from 'lucide-react';
import { useState } from 'react';
import {useForm} from "react-hook-form";
import { TransactionFormValues, transactoinSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";


export default function ProfilePage() {
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const dummy_data = {
        'balance': 400,
        'username': "mike",
        'phone': "(254) 724-027231",
        'gamesPlayed': 24,
        'wins': 18,
        'winRate': 75,
        'totalEarnings': 1250
    }

    const quickDepositAmounts = [100, 200, 500, 1000];

    const handleQuickDeposit = (amount: number) => {
        setDepositAmount(amount.toString());
    };



    const handleDeposit = () => {
        console.log(`Depositing KES ${depositAmount}`);
        // Add deposit logic here
    };


    const handleWithdraw = () => {
        console.log(`Withdrawing KES ${withdrawAmount}`);
        // Add withdrawal logic here
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
                <Header />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 space-y-6">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                            <User size={40} color="white" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-gray-900 text-xl font-semibold">{dummy_data.username}</h2>
                            <p className="text-gray-500 text-sm">{dummy_data.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Gaming Stats */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-gray-900 text-lg font-semibold mb-4">Gaming Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Games Won</p>
                            <p className="text-xl font-bold text-blue-600">{dummy_data.wins}</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Win Rate</p>
                            <p className="text-xl font-bold text-green-600">{dummy_data.winRate}%</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Games Played</p>
                            <p className="text-xl font-bold text-purple-600">{dummy_data.gamesPlayed}</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <Plus className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Total Earnings</p>
                            <p className="text-xl font-bold text-orange-600">KES {dummy_data.totalEarnings}</p>
                        </div>
                    </div>
                </div>

                {/* Account Balance */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-gray-900 text-lg font-semibold mb-4">Account Balance</h3>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-blue-100 text-sm">Available Balance</p>
                                <p className="text-3xl font-bold">
                                    <span className="text-lg">KES</span> {dummy_data.balance}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-blue-100 text-sm">Ready to Stake</p>
                                <p className="text-xl font-semibold">COD WARS</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-gray-900 text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                            <Plus size={20} className="mr-2" />
                            Add Funds
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                            <Sword size={20} className="mr-2" />
                            Find Match
                        </button>
                    </div>
                </div>

                {/* Deposit Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-gray-900 text-lg font-semibold mb-2">Deposit</h3>
                    <p className="text-gray-600 text-sm mb-4">Add money to your COD WARS account</p>
                    
                    {/* Quick Deposit Buttons */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {quickDepositAmounts.map(amount => (
                            <button
                                key={amount}
                                onClick={() => handleQuickDeposit(amount)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors border"
                            >
                                +{amount}
                            </button>
                        ))}
                    </div>

                    {/* Deposit Input */}
                    <div className="space-y-4">
                        <input
                            type="number"
                            placeholder="Enter amount to deposit"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500">
                            Minimum KES 10. All transactions are subject to 5% tax.
                        </p>
                        <button
                            onClick={handleDeposit}
                            disabled={!depositAmount || parseFloat(depositAmount) < 10}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
                        >
                            Deposit
                        </button>
                    </div>
                </div>

                {/* Withdrawal Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-gray-900 text-lg font-semibold mb-2">Withdrawals</h3>
                    <p className="text-gray-600 text-sm mb-4">Withdraw your winnings from COD WARS</p>
                    
                    <div className="space-y-4">
                        <input
                            type="number"
                            placeholder="Enter amount to withdraw"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleWithdraw}
                            disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
                        >
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200">
                <NavBar />
            </div>
        </div>
    );
}