'use client'

export interface message_props  {
    message : {
        type : string;
        sid : string ;
        message : string; // this is representation of the actual chat message sent by the user
    }
}
export default function Message ({message} : message_props) {
    if (message.type === 'join') {
        return <p className = 'text-black'>{message.sid} just joined</p>
    }
    if (message.type === 'chat') {
        return <p className = "text-black">{`${message.sid} : ${message.message}`}</p>
        }
}