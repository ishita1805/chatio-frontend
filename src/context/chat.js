import React, { useState } from 'react'

const ChatContext = React.createContext()

const ChatProvider = ({ children }) => {

    const [conversation, setConversation] = useState('');

    return (
        <ChatContext.Provider value={{ conversation, setConversation }}>
            {children}
        </ChatContext.Provider>
    )
}

export { ChatContext, ChatProvider } 