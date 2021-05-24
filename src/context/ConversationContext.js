import React, { useState } from 'react'

const ConversationContext = React.createContext()

const ConversationProvider = ({ children }) => {
  
    const [convos, setConvos] = useState([]);
    const [messages, setMessages] = useState([]);
    const [media, setMedia] = useState([]);
    const [convoData, setConvoData] = useState({
        User1:{
            userid:''
        },
        User2:{
            userid:''
        }
    });

    // localStorage.removeItem('conversation');


    return (
        <ConversationContext.Provider value={{ media, messages, convos, convoData, setConvoData, setConvos, setMessages, setMedia }}>
            {children}
        </ConversationContext.Provider>
    )
}

export { ConversationContext, ConversationProvider } 