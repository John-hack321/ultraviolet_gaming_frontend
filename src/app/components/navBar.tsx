'use client'
import { navBarIcons } from "@/constants"
import { string } from "zod/v4-mini"

export default function NavBar({bg , textColor} : {bg : string , textColor : string}) {
    // for now we are going to map the strings to actual tailwind cess types
    const bgClasses = {
        'orange-300': 'bg-orange-300',  // Using the custom gray color
        'white': 'bg-white',
        'native-brown' : 'bg-[#302E2B]',
        'text-black' : 'text-black',
        // Add other colors as needed
    }[bg] || 'bg-white'; // Fallback to white
    return (
        <div className = {`${bgClasses}`} >
            <div className = "w-full flex items-center justify-between px-2">
                {navBarIcons.map(icon => (
                    <a key={icon.name} href={icon.redirectPath} className = {`px-4 py-2 flex flex-col items-center  ${textColor} mx-2 rounded-md hover:bg-gray-200`}>
                        {icon.icon}
                        <p className = {`text-xs ${textColor}`}>{icon.name}</p>
                    </a>
                ))}
                
            </div>
        </div>
    )
};