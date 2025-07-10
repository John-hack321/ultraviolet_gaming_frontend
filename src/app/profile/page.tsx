'use client'
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export default function ProfilePage() {

    const {logout} = useAuth();
    const router = useRouter()

    const handleClick = () => {
        console.log("you are now logging out")
        logout()
    }

    return (
        <div className = "min-h-screen bg-white">
            <div className = "justify-end flex">
                <button 
                className = "text-black px-3 py-1 rounded-lg border border-blacke m-2"
                onClick = {handleClick}>
                    logout
                </button>
            </div>
        </div>
    )
}