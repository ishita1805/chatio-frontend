/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState, useContext, useEffect } from 'react'
import { MainContext } from '../../context/MainContext'
import { ConversationContext } from '../../context/ConversationContext'
import { ContactsContext } from '../../context/ContactContext'
import axios from 'axios'
import url from '../../url'
import logo from '../../assets/logo.png'
import { SocketContext } from '../../context/socketContext'
import './style.css'
import Conversations from '../../components/conversations/Conversation'
import Profile from '../../components/profile/Profile'
import Contact from '../../components/contacts/Contact'
import Chat from '../../components/chat/Chat'
import { ChatContext } from '../../context/chat'

const Screen = () => {
    const { id, ID, setAuth, setId, setID } = useContext(MainContext);
    const { setConvoData } = useContext(ConversationContext);
    const { setContacts, setSent, setReceived } = useContext(ContactsContext);
    const { conversation } = useContext(ChatContext)
    const socket = useContext(SocketContext);
    const [minimize, setMinimize] = useState(false);
    const [state, setState] = useState(1);
    

    const toggleMin = () => {
        setMinimize(!minimize);
    }

    useEffect(() => {
        // loading contacts
        // loading conversations
        // joining all rooms
        axios.get(`${url}/contact/get`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            .then((resp) => {
                setContacts(resp.data.resp);
                let ar = [];
                resp.data.resp.forEach(element => {
                    ar.push(element.id);
                });
                socket.emit('join',{userID: ID, rooms: ar});
            })
            .catch((e) => {
                console.log(e);
            })
    },[])

    useEffect(() => {
        socket.on('online',({room}) => {
            axios.get(`${url}/contact/get`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
                .then((resp) => {
                    setContacts(resp.data.resp);
                })
                .catch((e) => {
                    console.log(e);
                })
            if(localStorage.getItem('conversation')=== room){
                axios.post(`${url}/contact/getOne`, { id: localStorage.getItem('conversation') }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
                    .then((resp) => {
                        let tempObj = {
                            id:resp.data.resp.id,
                            User1: resp.data.resp.User1,
                            User2: resp.data.resp.User2,
                            User1Id: resp.data.resp.User1Id,
                            User2Id: resp.data.resp.User2Id,
                        }
                        setConvoData(tempObj);
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }
        })

        socket.on('offline',({room}) => {
            axios.get(`${url}/contact/get`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
                .then((resp) => {
                    setContacts(resp.data.resp);
                })
                .catch((e) => {
                    console.log(e);
                })
            if(localStorage.getItem('conversation')=== room){
                axios.post(`${url}/contact/getOne`, { id: localStorage.getItem('conversation') }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
                    .then((resp) => {
                        let tempObj = {
                            id:resp.data.resp.id,
                            User1: resp.data.resp.User1,
                            User2: resp.data.resp.User2,
                            User1Id: resp.data.resp.User1Id,
                            User2Id: resp.data.resp.User2Id,
                        }
                        setConvoData(tempObj);
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }
        })

        socket.on('request_socket_accept',({ id }) => {
            
            if(id === ID) {
              axios.get(`${url}/contact/get`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
              .then((resp) => {
                  setContacts(resp.data.resp);
              })
              .catch((e) => {
                  console.log(e);
              })
            }
        })

        socket.on('request_socket',({ id }) => {
            
            if(id === ID) {
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
            }
        })

    }, [socket])


    

    const logout =  () => {
        axios.post(`${url}/users/logout`,{ ID }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
        .then(() => {
            setAuth(false);
            setID('');
            setId('');
        })
        .catch((e) => {
            console.log(e);
        })
    }

    return (
        <div className='screen-handler'>
          <div className={minimize ? 'sidebar-small' : 'sidebar'}>
            <div className='sidebar-nav'>
                <p>
                    <i className={minimize?'fa fa-chevron-right icon-min':'fa fa-chevron-left back-icon'} onClick={toggleMin}></i>
                    {
                        !minimize ?
                            <>
                                &ensp;
                                <span onClick={() => setState(2)}>{id}</span>
                            </> : null
                    }
                </p>
                {
                    !minimize ?
                        <div className='row-icons-sidebar'>
                            <i className='fa fa-user' onClick={() => setState(0)}></i>
                            <i className='fa fa-comment' onClick={() => setState(1)}></i>
                        </div> : null
                }
            </div>
            {
                !minimize ? <>
                    {state === 2 ? null :
                        <div className='sidebar-header'>
                            <input type='text' placeholder={state === 1 ? 'Search Conversations' : 'Search Contacts'} />
                            <i className='fa fa-search'></i>
                        </div>
                    }
                </> : null
            }

            {
                state === 1 && !minimize ?
                    <Conversations /> : null
            }
            {
                state === 0 && !minimize ?
                    <Contact new={() => setState(1)} /> : null
            }
            {
                state === 2 && !minimize ?
                    <Profile /> : null
            }   
        </div>
        {
                conversation!==''?
                <Chat/>:
                <div className='chat-no-open'>
                    <button className='logout-button abs-logout' onClick={logout}>Logout</button>
                    <div className='chat-no-open-in'>
                        <img alt="media" src={logo}/>
                        <h3>Please select a chat to continue</h3>
                    </div>
                </div>
            }
        </div>
    )
}

export default Screen
