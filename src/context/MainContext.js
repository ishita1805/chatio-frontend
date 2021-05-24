import React, { useState } from 'react'

const MainContext = React.createContext()

const MainProvider = ({ children }) => {
    // set auth from cookies here
    const [auth, setAuth] = useState(false);
    const [id, setId] = useState('');
    const [ID, setID] = useState('');

    return (
        <MainContext.Provider value={{ auth, id, ID, setAuth, setId, setID }}>
            {children}
        </MainContext.Provider>
    )
}

export { MainContext, MainProvider } 