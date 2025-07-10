'use client'
import { navBarIcons } from "@/constants"


export default function NavBar() {
    return (
        <div className = "bg-white w-full">
            <div className = "w-full flex items-center justify-between px-2">
                {navBarIcons.map(icon => (
                    <a key={icon.name} href={icon.redirectPath} className = "px-4 py-2 flex flex-col items-center  text-black mx-2 rounded-md hover:bg-gray-200">
                        {icon.icon}
                        <p className = "text-xs text-black">{icon.name}</p>
                    </a>
                ))}
                
            </div>
        </div>
    )
}