/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{ useRef, useEffect, useState, useContext } from 'react'
import logo from '../../assets/logo1.png'
import {ConversationContext} from '../../context/ConversationContext'
import {MainContext} from '../../context/MainContext'
import Picker from 'emoji-picker-react';
import Carousel from '../carousel/Carousel'
import './chat.css'
import axios from 'axios';
import icons from '../../images'
import url from '../../url'
import { ChatContext } from '../../context/chat';
import { SocketContext } from '../../context/socketContext'

const Chat = () => {
    const[emoji, setEmoji] = useState(false);
    const[active, setActive] = useState(false);
    const { setConvos, setMedia, media, convoData, messages, setMessages  } = useContext(ConversationContext);
    const { ID, setId, setAuth, setID } = useContext(MainContext);
    const { conversation } = useContext(ChatContext);
    const [index,setIndex] = useState(0);
    const [carousel,setCarousel] = useState(false);
    const inputRef = useRef();
    const fileRef = useRef();
    const chatRef = useRef();
    const socket = useContext(SocketContext)
    const [mediaPrev, setMediaPrev] = useState(false);
    const [ind,setInd] = useState(Math.floor(Math.random() * 6) + 1);
       

    useEffect(()=>{
        socket.on('messageTrigger',({room, msg}) => {
            if(convoData.id === localStorage.getItem('conversation') && messages.length>0){
                if(room === localStorage.getItem('conversation')) {
                    setMessages([msg,...messages]);
                    if(msg.type === 'media') setMedia([msg,...media]);
                }
                axios.get(`${url}/contact/getConversation`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
                    .then((resp) => {
                        setConvos(resp.data.resp);
                    })
                    .catch((e) => {
                        console.log(e);
                    }) 
            }
        })   
    },[messages])

    useEffect(() => {
        setInd(Math.floor(Math.random() *6))
    },[conversation])

    
    const activeHandler = (id) => {
        if(active===id) setActive(false);
        else setActive(id);
    }

    
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

    const messageHandler = (e) => {
        // for text+file here
        e.preventDefault();
        if(mediaPrev){
        const data = new FormData();
        data.append('body', inputRef.current.innerText.trim());
        data.append('type', 'media');
        data.append('UserId', ID);
        data.append('ContactId', conversation);
        data.append('file', fileRef.current.files[0]);
        axios.post(`${url}/message/createMedia`, data , { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                let dt = response.data.resp;
                // setMedia([dt,...media]);
                socket.emit('sendMessage', { room: conversation, msg: dt });
                closeMedia();
            })
            .catch((e) => {
                console.log(e);
            });
        }
        // for only text data
        else {
            let data = {
                body: inputRef.current.innerText.trim(),
                type: 'text',
                UserId: ID,
                ContactId: conversation
            }
            axios.post(`${url}/message/create`,data , { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            .then(() => {
                inputRef.current.innerText='';
                setEmoji(false)
                activeHandler(3)
                data.createdAt = new Date();
                socket.emit('sendMessage', { room: conversation, msg: data });
            })
            .catch((e) => {
                console.log(e);
            })
        }  
    }

    const emojiHandler = (_, emojiObject) => {
        inputRef.current.innerText+=emojiObject.emoji;
    }
    
    const mediaHandler = ()=>{
        fileRef.current.click();
        setEmoji(false);activeHandler(2);
    }
    const mediaPreviewHandler = () => {
        setMediaPrev(true);
    }
    
    const closeMedia = () => {
        setMediaPrev(false);
    }

    const handleImageView = (id) => {
        setIndex(media.indexOf(media.find((x) => x.id === id)));
        setCarousel(true);
    }
 

    return (
        <div className='chat-screen'>
           
            <div className='chat-header'>
                <div className='row-chat-header'>
                    <div className='chat-icon'>
                    <img alt='profile' src={icons[ind]} className='chat-icon-im'/>
                    </div>
                    
                    {
                        convoData.User1Id !== ID?
                        <><p>{convoData.User1.userid}&ensp;</p>{convoData.User1.online?<span className='online-icon'></span>:null}</>:
                        <><p>{convoData.User2.userid}&ensp;</p>{convoData.User2.online?<span className='online-icon'></span>:null}</>
                    }
                </div>
                <img src={logo} alt='logo'/>
                <button className='logout-button' onClick={logout}>Logout</button>
            </div>
                    {
                        mediaPrev?
                        <div className='media-preview'>
                            <i className='fa fa-times' onClick={closeMedia}></i>
                            <img alt="media" src={URL.createObjectURL(fileRef.current.files[0])}/>
                        </div>
                        :
                        <div className='chat-content' ref={chatRef}>
                            {
                                
                                messages.map((item) => {
                                   
                                    if(item.UserId === ID){
                                        let h = new Date(item.createdAt).getHours();
                                        let m = new Date(item.createdAt).getMinutes();
                                        if(!item.file){
                                            return  <div className='user-1-chat'>
                                                        {item.body}
                                                        <p className='date-msg'>{`${h}:${m}`}</p>
                                                    </div>
                                        }
                                        else return <div className='user-1-chat'>
                                                        <img alt="media" src={item.file} onClick={()=>handleImageView(item.id)}/>
                                                        {item.body}
                                                        <p className='date-msg'>{`${h}:${m}`}</p>
                                                    </div>
                                    }
                                    else {
                                        let h = new Date(item.createdAt).getHours();
                                        let m = new Date(item.createdAt).getMinutes();
                                        if(!item.file){
                                            return <div className='user-2-chat'>
                                                        {item.body}
                                                        <p className='date-msg-2'>{`${h}:${m}`}</p>
                                                    </div>
                                        }
                                        else return <div className='user-2-chat'>
                                                        <img alt="media" src={item.file} onClick={()=>handleImageView(item.id)}/>
                                                        {item.body}
                                                        <p className='date-msg-2'>{`${h}:${m}`}</p>
                                                    </div>
                                    }
                                   
                                })
                            }    
                        </div>
                    }

                    <div className='text-box'>
                        <span className='text-inp' placeholder='Message...' contentEditable={true} ref={inputRef}></span>
                        <div className='text-icons'>
                            <input ref={fileRef} type='file' onChange={mediaPreviewHandler} style={{display: 'none'}} accept="image/*"/>
                            <i class={active===1?"fa fa-smile active":"fa fa-smile"} aria-hidden="true" onClick={()=>{setEmoji(!emoji);activeHandler(1)}}></i>
                            <i class="fa fa-paperclip" aria-hidden="true" onClick={mediaHandler}></i>
                            <i className="fa fa-paper-plane" onClick={(e)=>messageHandler(e)}></i>
                        </div>
                    </div>
                    { 
                    emoji?
                    <div className='emoji-picker-tool'>
                        <Picker 
                            pickerStyle={{ 
                                flexGrow:1,
                                zIndex:200,
                                boxShadow:'none',
                                background: 'rgb(48, 48, 48)',
                                borderColor:'rgb(41, 41, 41)',
                                color:'rgb(170, 170, 170)'
                            }}
                            onEmojiClick={emojiHandler}
                            groupNames={{
                                smileys_people: '',
                                animals_nature: '',
                                food_drink: '',
                                travel_places: '',
                                activities: '',
                                objects: '',
                                symbols: '',
                                flags: '',
                                recently_used: '',
                            }} 
                        />
                    </div>
                    :null
                    }

               

            {
               carousel?
               <Carousel images={media} inx={index} close={()=>setCarousel(false)}/>:
               null
           }
            
        </div>
    )
}

export default Chat
