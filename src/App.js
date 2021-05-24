/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext ,useEffect} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import {SocketProvider} from './context/socketContext'
import {MainContext} from './context/MainContext'
import {ChatProvider} from './context/chat'
import Login from './containers/login/Login'
import Screen from './containers/screen/Screen'
import Cookies from 'js-cookie'

function App() {
  const { auth, setAuth, setId, setID } = useContext(MainContext);
  localStorage.setItem('conversation','');

  useEffect(() => {
    if(Cookies.get('chat-jwt')) {
      setId(Cookies.get('chat-userid'));
      setID(Cookies.get('chat-id'));
      setAuth(true);
    }
  },[]);

  return (
   
      <Switch>
        {
          auth?
          <>
            
              <Route path='/' exact>
                <SocketProvider>
                  <ChatProvider>
                    <Screen/>
                  </ChatProvider>
                </SocketProvider>
              </Route>
           
          </>:
          <>
            <Route path='/' exact>
              <Login/>
            </Route>
          </>
        }
      </Switch>

  );
}

export default App;
