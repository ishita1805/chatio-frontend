import React, { useState } from 'react'
import crypto from 'crypto'
const EncryptContext = React.createContext()

const EncryptProvider = ({ children }) => {
    const user = crypto.getDiffieHellman('modp5');
    user.generateKeys();
    const [key, setKey] = useState(user);
    
    return (
        <EncryptContext.Provider value={{ key, setKey }}>
            {children}
        </EncryptContext.Provider>
    )
}

export { EncryptContext, EncryptProvider } 