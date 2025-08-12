'use client'
import { navBarIcons } from "@/constants"
import { string } from "zod/v4-mini"

export default function NavBar( {classname  } : {classname : string}) {
    // for now we are going to map the strings to actual tailwind cess types
    return (
        <div className = {`${classname}`} >
            <div className = "w-full flex items-center justify-between px-2">
                {navBarIcons.map(icon => (
                    <a key={icon.name} href={icon.redirectPath} className = {`px-4 py-2 flex flex-col items-center mx-2 rounded-md hover:bg-gray-200`}>
                        <span className = "">{icon.icon}</span>
                        <p className = {`text-xs `}>{icon.name}</p>
                    </a>
                ))}
                
            </div>
        </div>
    )
};