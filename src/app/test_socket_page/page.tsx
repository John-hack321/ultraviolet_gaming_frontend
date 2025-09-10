{/*'use client'
import React, { useState, useEffect } from 'react';
import Message from "../components/message"
import { io, Socket } from "socket.io-client";

interface MessageType {
  type: 'join' | 'chat' | 'leave';
  username?: string;
  message?: string;
  timestamp?: string;
}

interface MessageProps {
  message: MessageType;
}

// Get API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001';

// Create a single socket instance
export const socket: Socket = io(API_URL, {
  path: '/sockets',
  transports: ['websocket']
});

export default function SocketPage() {

    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        socket.on('connect' , () => {
            setIsConnected(socket.connected)
        }) ;

        socket.on('disconnect' , () => {
            setIsConnected(socket.connected);
        })

        socket.on('join', (data: { username: string }) => {
            console.log(data)
            setMessages((prevMessages) => [...prevMessages , {...data , type : 'join'}])
        })

        socket.on('chat', (data: { username: string; message: string }) => {
            setMessages((prevMessages) => [...prevMessages , {...data , type : 'chat'}])

        })
    } , [])

    const handleSend = () => {
        console.log('the send button has been clicked')
        if (message && message.length) {
            socket.emit('chat', message);
            setMessage('');
        }
    }

    return (
        <div className = 'min-h-screen bg-white px-2 py-4'>
            <p className = "text-black mt-4">status : {' '}
                <span className = "text-green-500 font-bold">
                    {isConnected ? 'connected' : 'not conneted'}
                    </span>
            </p>
            <div className = " border overflow-scroll border-gray-700  p-2 h-150">
                {
                    messages.map((message , index) => (
                        <Message key = {index} message = {message}/>
                    ) )
                }
            </div>
            <div className ="mt-4 flex gap-2 rounded-full border border-black p-2 justify-between px-4">
                <input id='message'
                type="text"
                onChange={(event) => {
                    const value = event.target.value.trim();
                    setMessage(value);
                }}
                placeholder="Enter your message"
                className ='border w-3/4 p-2 rounded-full  placeholder:text-gray-400n text-black'/>
                <button className = "text-black border p-2 rounded-full"
                            onClick={handleSend}>
                            Send
                        </button>
            </div>
        </div>
    )
}
*/}