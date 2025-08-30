'use client'

export interface message_props  {
    message : {
        type : string;
        sid : string ;
        message : string;
    }
}
export default function Message ({message} : message_props) {
    if (message.type === 'join') {
        return <p>{message.sid} just joined</p>
    }
}