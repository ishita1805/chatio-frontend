import React, { useContext, useState } from 'react';
import axios from 'axios';
import url from '../../url'
import { SocketContext } from '../../context/socketContext';

const Screen1 = () => {
    const [input, setInput] = useState('');
    const [display, setDisplay] = useState(false);
    const [err, setErr] = useState('')
    const socket = useContext(SocketContext)

    const requestHandler = () => {
        if(input !=='') {
            // console.log('here');
            axios.post(`${url}/request/create`, { receiver: input }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            .then((resp) => {
                // console.log(resp);
                socket.emit('request', { id: resp.data.id })
                setDisplay(true);
                setInput('');
                if(resp.data.error){
                    setErr(resp.data.error);
                }
            })
            .catch((e) => {
                console.log(e.error);
               

            });
        }
        else setErr('Name cannot be empty')
    }
   
    return (
        <div>
            <input className='input-contact' value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Add User Id"/>
            {
                display?
                <button className='new-contact-button' onClick={requestHandler}>Send Another Request</button>:
                <button className='new-contact-button' onClick={requestHandler}>Send Request</button>
            }
            <p className='inp-err-contact'>{err}</p>
        </div>
    )
}

export default Screen1
