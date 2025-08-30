'use client'
import Message from "../components/message"
import { io } from "socket.io-client"
import React , { useState , useEffect} from "react"

const socket = io('http://localhost:8001' , {
    path : '/sockets',
    transports : ['websocket']
}) // and thats how we create a socket for now

export default function socketPage () {

    const [isConnected , setIsConnected ] = useState(socket.connected);
    const [messages , setMessages] = useState<any[]>([]);

    useEffect(() => {
        socket.on('connect' , () => {
            setIsConnected(socket.connected)
        }) ;

        socket.on('disconnect' , () => {
            setIsConnected(socket.connected);
        })

        socket.on('join' , (data) => {
            setMessages((prevMessages) => [...prevMessages , {...data , type : 'join'}])
        })
    } , [])

    return (
        <div className = 'min-h-screen bg-white px-2 py-4'>
            <p className = "text-black mt-4">status : {' '}
                <span className = "text-green-500 font-bold">
                    {isConnected ? 'connected' : 'not conneted'}
                    </span>
            <div className = " border overflow-scroll  p-2 h-150">
                {
                    messages.map((message , index) => (
                        <Message key = {index} message = {message}/>
                    ) )
                }
            </div>
            </p>
        </div>
    )
}