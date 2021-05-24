import React, { useEffect, useState, useContext } from 'react'
import {MainContext} from '../../context/MainContext'
import {ConversationContext} from '../../context/ConversationContext'
import {ChatContext} from '../../context/chat'
// import axios from 'axios'
// import url from '../../url'

const Conversation = () => {
    const { ID } = useContext(MainContext);    
    const { convos } = useContext(ConversationContext);
    const { conversation, setConversation } = useContext(ChatContext)
    const [time, setTime] = useState(new Date());
   
    useEffect(() => {
        setInterval(() => { 
            setTime(new Date());
         }, 300000);
    }, [])

    
    const addConversation = (notify,conid,message) => {
        localStorage.setItem('conversation',conid);
        setConversation(conid);
        // if(message){
        //     if(notify && message.UserId !== ID){
        //         axios.post(`${url}/contact/updateNotification`, { id: conid }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
        //         .then(() => {
        //             let convo_clone = convos
        //             let index = convo_clone.findIndex((item)=>item.id === conid)
        //             convo_clone[index].notification = false;
        //             setConvos(convo_clone);
                   
        //         })
        //         .catch((e) => {
        //             console.log(e);
        //         })
        //     }
        // }       
    }

    return (
        <div className='sidebar-list'>
            {
                convos.map((item) => {
                    let msec,m,h,d,show;
                    // console.log(convos);
                    if(item.Messages[0]){
                        if(item.Messages[0].UserId === ID) show = false;
                        else show = true;
                        msec = (time-new Date(item.Messages[0].createdAt))
                        m = parseInt(msec/60000)
                        h = parseInt(m/60)
                        d = parseInt(h/24)
                    }

                    
                        if(item.User1Id !== ID) return <div className={item.id===conversation?'conversation-head-active':'conversation-head'} onClick={()=>addConversation(item.notification,item.id,item.Messages[0])}>
                                    <div className='conversation-icon'></div>
                                    {item.notification && item.id!==conversation && show?<div className='conversation-alert'></div>:null}
                                    <div className={item.id===conversation?'conversation-p1-active':'conversation-p1'}>
                                        <p>{item.User1.userid}</p>
                                        {
                                            item.Messages[0]?
                                            item.Messages[0].body===''?
                                            item.Messages[0].file?
                                            <span><b>Image</b></span>
                                            :<span>{item.Messages[0].body.substring(0,12)}...</span>
                                            :<span>{item.Messages[0].body.substring(0,12)}...</span>
                                            :<p></p>
                                        }
                                        
                                    </div>
                                    <span className={item.id===conversation?'conversation-day-active':'conversation-day'}>
                                        { msec? <>&#8226;</>:null }
                                        {
                                            msec?
                                            d===0?
                                            h===0?
                                            m===0?
                                            'now':
                                            `${m} m`:
                                            `${h} h`:
                                            `${d} d`:
                                            null
                                        }
                                    </span>
                                </div>
                        else return <div className={item.id===conversation?'conversation-head-active':'conversation-head'} onClick={()=>addConversation(item.notification,item.id,item.Messages[0])}>
                                    <div className='conversation-icon'></div>
                                    {item.notification && item.id!==conversation && show?<div className='conversation-alert'></div>:null}
                                    <div className={item.id===conversation?'conversation-p1-active':'conversation-p1'}>
                                        <p>{item.User2.userid}</p>
                                        {
                                            item.Messages[0]?
                                            item.Messages[0].body===''?
                                            item.Messages[0].file?
                                            <span><b>Image</b></span>
                                            :<span>{item.Messages[0].body.substring(0,12)}...</span>
                                            :<span>{item.Messages[0].body.substring(0,12)}...</span>
                                            :<p></p>
                                        }
                                        {/* <span>{item.Messages[0].body.substring(0,12)}...</span> */}
                                    </div>
                                    <span className={item.id===conversation?'conversation-day-active':'conversation-day'}>
                                    { msec? <>&#8226;</>:null }
                                        {
                                            msec?
                                            d===0?
                                            h===0?
                                            m===0?
                                            'now':
                                            `${m} m`:
                                            `${h} h`:
                                            `${d} d`:
                                            null
                                        }
                                    </span>
                                </div>
                    }
                )
            }
        </div>
    )
}

export default Conversation
