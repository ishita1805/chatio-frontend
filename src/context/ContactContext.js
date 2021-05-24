import React, { useState } from 'react'

const ContactsContext = React.createContext()

const ContactsProvider = ({ children }) => {
    
    const [contacts, setContacts] = useState([]);
    const [received,setReceived] = useState([]);
    const [sent,setSent] = useState([]);


    return (
        <ContactsContext.Provider value={{ received, contacts,sent, setSent, setContacts, setReceived }}>
            {children}
        </ContactsContext.Provider>
    )
}

export { ContactsContext, ContactsProvider } 