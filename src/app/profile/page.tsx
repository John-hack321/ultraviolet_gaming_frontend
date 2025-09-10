'use client';
import Header from "../components/header";
import NavBar from "../components/navBar";
import { User, Plus, Trophy, Target, Star, Sword, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from "../context/authContext";
import ProtectedRoute from "../components/protectedRoute";
import { UserProfileResponse, fetchUserProfile, doTransaction } from "../api/users";
import AccountBalance from "../components/accountComponent";

function ProfileContent() {
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserProfileResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();

    const stats = { gamesPlayed: 24, wins: 18, winRate: 75, totalEarnings: 1250 };
    const quickDepositAmounts = [100, 200, 500, 1000];

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await fetchUserProfile();
                setUserData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, []);

    const handleQuickDeposit = (amount: number) => setDepositAmount(amount.toString());

    const handleDeposit = async () => {
        try {
            setLoading(true);
            const data = await doTransaction(parseFloat(depositAmount), 1);
            setUserData(data);
            setDepositAmount('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to deposit');
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        try {
            setLoading(true);
            const data = await doTransaction(parseFloat(withdrawAmount), 2);
            setUserData(data);
            setWithdrawAmount('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to withdraw');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border max-w-md">
                    <div className="text-red-500 text-lg mb-4">Error loading profile</div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Retry</button>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border max-w-md">
                    <div className="text-gray-600">No profile data available</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="sticky top-0 z-10 bg-white shadow-sm"><Header /></div>

            <div className="flex-1 container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center"><User size={40} color="white" /></div>
                                <div className="text-center">
                                    <h2 className="text-gray-900 text-xl font-semibold">{userData.username}</h2>
                                    <p className="text-gray-500 text-sm">{userData.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-gray-900 text-lg font-semibold mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"><Plus size={20} className="mr-2" />Add Funds</button>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"><Sword size={20} className="mr-2" />Find Match</button>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <button onClick={logout} className="w-full text-gray-600 px-3 py-2 border bg-gray-200 border-gray-600 justify-center gap-2 flex rounded-lg"><LogOut />Logout</button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-gray-900 text-lg font-semibold mb-4">Gaming Stats</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-blue-50 rounded-lg"><Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" /><p className="text-sm text-gray-600">Games Won</p><p className="text-xl font-bold text-blue-600">{stats.wins}</p></div>
                                <div className="text-center p-3 bg-green-50 rounded-lg"><Target className="w-8 h-8 text-green-600 mx-auto mb-2" /><p className="text-sm text-gray-600">Win Rate</p><p className="text-xl font-bold text-green-600">{stats.winRate}%</p></div>
                                <div className="text-center p-3 bg-purple-50 rounded-lg"><Star className="w-8 h-8 text-purple-600 mx-auto mb-2" /><p className="text-sm text-gray-600">Games Played</p><p className="text-lg font-semibold">{stats.gamesPlayed}</p></div>
                                <div className="text-center p-3 bg-orange-50 rounded-lg"><Plus className="w-8 h-8 text-orange-600 mx-auto mb-2" /><p className="text-gray-500 text-sm">Total Earnings</p><p className="text-lg font-semibold">KES {stats.totalEarnings}</p></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-gray-900 text-lg font-semibold mb-4">Account Balance</h3>
                            <AccountBalance balance={userData.account_balance} />
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-gray-900 text-lg font-semibold mb-2">Deposit</h3>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {quickDepositAmounts.map(amount => <button key={amount} onClick={() => handleQuickDeposit(amount)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors border">+{amount}</button>)}
                            </div>
                            <div className="space-y-4">
                                <input type="number" placeholder="Enter amount to deposit" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                <p className="text-xs text-gray-500">Minimum KES 10. All transactions are subject to 5% tax.</p>
                                <button onClick={handleDeposit} disabled={!depositAmount || parseFloat(depositAmount) < 10} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors">Deposit</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-gray-900 text-lg font-semibold mb-2">Withdrawals</h3>
                            <div className="space-y-4">
                                <input type="number" placeholder="Enter amount to withdraw" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                <button onClick={handleWithdraw} disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors">Withdraw</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200"><NavBar classname="bg-white text-black" /></div>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}
