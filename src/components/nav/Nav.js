/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect,useContext, useState } from 'react'
import { ContactsContext } from '../../context/ContactContext'
import axios from 'axios';
import url from '../../url'
import './nav.css'
import { SocketContext } from '../../context/socketContext';

const Nav = () => {
    const { setSent, setReceived, updated, setUpdated, sent, received, contacts, setContacts } = useContext(ContactsContext);
    const [state, setState] = useState('Requests');
    const socket = useContext(SocketContext);
    let arr = [
        'Requests',
        'Sent'
    ];

    useEffect(() => {
        axios.get(`${url}/request/sent`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
        .then((resp) => {
            setSent(resp.data.resp);
        })
        .catch((e) => {
            console.log(e);
        })

        axios.get(`${url}/request/received`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
        .then((resp) => {
            setReceived(resp.data.resp);
        })
        .catch((e) => {
            console.log(e);
        })
    }, [updated])

    const deleteRequest = (r_id, id) => {
        axios.post(`${url}/request/delete`, { id }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
        .then(() => {
            socket.emit('request', { id: r_id })
            setUpdated(!updated);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const rejectRequest = (r_id, id) => {
        axios.post(`${url}/request/reject`, { id }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
        .then(() => {
            socket.emit('request', { id: r_id })
            setUpdated(!updated);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const acceptRequest = (id, user) => {
        axios.post(`${url}/contact/create`, { id, user }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
        .then((resp) => {
            socket.emit('request_accepted', { id: user })
            setUpdated(!updated);
            setContacts([...contacts, resp.data.resp]);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    return (
        <>
        <div className='nav-row'>
            {
                arr.map((item) => (
                    <div 
                    className={item===state?'nav-item-active':'nav-item'} 
                    onClick={()=>{setState(item)}}>
                        {item}
                    </div>
                ))
            }
        </div>
        <div className='requests-container'>
            {
                state==='Requests'?
                <>
                    {received.map((item) => (
                        <div className='request-1'>
                            {item.Sender.userid}
                            <div className='row-icons-sidebar'>
                                <i className='fa fa-times ricon-red' onClick={()=>rejectRequest(item.SenderId,item.id)}></i>
                                <i className='fa fa-check ricon-green' onClick={()=>acceptRequest(item.id, item.Sender.id)}></i>
                            </div>
                        </div>
                    ))}
                </>
                :
                <>
                    {sent.map((item) => (
                        <div className='request-1'>
                            {item.Receiver.userid}
                            <div className='row-icons-sidebar'>
                                <i className='fa fa-times ricon-red' onClick={()=>deleteRequest(item.ReceiverId,item.id)}></i>
                            </div>
                        </div>
                    ))}
                </>
            }
        </div>
        </>
    )
}

export default Nav
