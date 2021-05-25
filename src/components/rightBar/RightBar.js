/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useContext, useState } from 'react'
import './rightBar.css'
import Carousel from '../carousel/Carousel.js'
import {ConversationContext} from '../../context/ConversationContext'
// import axios from 'axios'
// import url from '../../url'
// import { MainContext } from '../../context/MainContext'
// import { SocketContext } from '../../context/socketContext'
// import { ChatContext } from '../../context/chat'

const RightBar = () => {
    const [minimize, setMinimize] = useState(true);
    const [carousel,setCarousel] = useState(false);
    const { media } = useContext(ConversationContext);
    // const { conversation } = useState(ChatContext);
    // const { ID } = useContext(MainContext);
    // const socket = useContext(SocketContext);
    const [index,setIndex] = useState(0);
   

    

    const toggleMin = () => {
        setMinimize(!minimize);
    }

   
    // const deleteImage = (id,pid) => {
    //     axios.post(`${url}/message/deleteMedia`,{ id, pid }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
    //     .then((resp) => {
    //         console.log(resp.data.message);
    //         // socket.emit('deletedImage', { id, room: conversation });
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     })
    // }

  
    return (
        <div className={minimize?'rightbar-small':'rightbar'}>
           <p className='rb-head'>
               {!minimize?<span>Media Files &ensp;</span>:null}
               <i className={minimize?'fa fa-chevron-left icon-min':'fa fa-chevron-right back-icon'} onClick={toggleMin}></i>
           </p>
           {
               !minimize?
               <div className='todo-list-cont'>
                    {
                        media.map((item,index) => (
                            <div className='todo-item'>
                                {/* {item.UserId===ID?<i className='fa fa-minus back-icon' onClick={()=>deleteImage(item.id,item.pid)}></i>:null} */}
                                <img alt="media" onClick={()=>{setCarousel(true);setIndex(index)}} src={item.file}/>
                            </div>
                        ))
                    }
                    {
                        media.length === 0?
                        <p className='media-files-msg'>No Media Files</p>:
                        null
                    }
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

export default RightBar
