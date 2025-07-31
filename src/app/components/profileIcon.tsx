'use client'
import {User} from 'lucide-react'

interface ProfileIconProps {
    width : number;
}

export default function ProfileIcon({width} : ProfileIconProps) {
    return (
        <div className = "text-black">
                    <div className = {`bg-gray-600  rounded-full flex justify-center item-center border-2 border-gray-600 p-1`}><User size = {width}/></div>
                </div>
    )
}