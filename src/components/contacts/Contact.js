/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import {MainContext} from '../../context/MainContext'
// import {ConversationContext} from '../../context/ConversationContext'
import {ContactsContext} from '../../context/ContactContext'
import ModalContact from '../modalContact/ModalContact'
import {ChatContext} from '../../context/chat'
import Screen1 from '../modalContact/Screen1'
import Nav from '../../components/nav/Nav'
import axios from 'axios'
import url from '../../url'

const Contact = (props) => {
    const { ID } = useContext(MainContext);
    // const { setMessages, setConvoData, setMedia, setConversation } = useContext(ConversationContext);
    const { received, contacts, setReceived, setSent } = useContext(ContactsContext);
    const { setConversation } = useContext(ChatContext)
    const [pop,setPop] = useState(false);
    const [type,setType] = useState(false);

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
    }, [])


    const addContact = () => {
        setPop(true);
        setType(true);
    }

    const manageContact = () => {
        setPop(true);
        setType(false);
    }

    const startChat = (convid, convo) => {
        if(convo===true){
            localStorage.setItem('conversation',convid);
            setConversation(convid);
            props.new(Math.random());
        }
        else {
            console.log('new');
            axios.post(`${url}/contact/update`, { id: convid }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            .then(() => {
                localStorage.setItem('conversation',convid);
                setConversation(convid);
                props.new(Math.random());
                
            })
            .catch((e) => {
                console.log(e);
            })
        }
    }

    return (
        <div className='contacts-container'>
             {pop?
                type?
                <ModalContact legend='Connect with new people :)' close={()=>setPop(!pop)}>
                    <Screen1/>
                </ModalContact>
                :
                <ModalContact legend='Manage Friend Requests' close={()=>setPop(!pop)}>
                    <Nav/>
                </ModalContact>
             :null}
            <div className='sidebar-list'>
            {
                contacts.map((item) => {
                  
                    if(item.User1.id !== ID) 
                    return  <div className='conversation-head' onClick={()=>startChat(item.id,item.conversation)}>
                                <div className='conversation-icon'></div>
                                <div className='conversation-p1'>
                                    <p>{item.User1.userid}</p>
                                    {
                                        item.User1.online?
                                        <span className='online-status'>online</span>:
                                        <span className='contact-span'>Last Seen: {new Date(item.User2.lastseen).toLocaleDateString().toString()}</span>
                                    }
                                    
                                </div>
                            </div>
                    else 
                    return  <div className='conversation-head' onClick={()=>startChat(item.id,item.conversation)}>
                                <div className='conversation-icon'></div>
                                <div className='conversation-p1'>
                                    <p>{item.User2.userid}</p>
                                    {
                                        item.User2.online?
                                        <span className='online-status'>online</span>:
                                        <span className='contact-span'>Last Seen: {new Date(item.User2.lastseen).toLocaleDateString().toString()}</span>
                                    }
                                </div>
                            </div>
                }
                   
                )
            }   
            </div>
            <div className='row-icons-sidebar'>
                <div>
                {received.length>0?
                <div className='request-alert'>{received.length}</div>
                :null} 
                <button className='new-contact-button-small' onClick={manageContact}>
                    <i className='fa fa-users'></i>
                </button>
                </div>
                <button className='new-contact-button' onClick={addContact}>+ Contact</button>
            </div>
        </div>
    )
}

export default Contact
