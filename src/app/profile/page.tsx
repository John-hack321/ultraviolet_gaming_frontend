'use client'
import Header from "../components/header";
import NavBar from "../components/navBar";
import {User} from 'lucide-react';

export default function ProfilePage(){

    const dummy_data = {
        'balance' : 400,
        'username' : "mike",
    }
    return (
        <div className = "min-h-screen flex-col  bg-white">
            <div className = "mt-0 sticky justify-start backdrop-blur w-full bg-blue-400">
            <Header/>
            </div>
            <div className = "flex flex-col justify-between space-y-4 bg-yellow-200">
                <div className = "flex flex-col bg-red-200 items-center">
                    <div className = "text-black  p-10 rounded-full border-2  ">
                        <User size={50} color="black"  />
                    </div>
                    <p className = "text-black text-2xl mt-2 ">
                        {dummy_data.username}</p>
                </div>
                <div className = "bg-green-100">
                    <div>
                        {/* the account balance will go here */}
                        <h1 className = "text-black text-xl ml-4">Account Balance</h1>
                        <p className = "text-black text-xl ml-4">
                        <span className = "mr-2">KES</span>{dummy_data.balance}</p>
                    </div>
                    <div>
                        {/* this part will be for a form for depositing and withdrawing money */}
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div className = "mb-0 sticky w-full ">
            <NavBar/>
            </div>
        </div>
    )
}


