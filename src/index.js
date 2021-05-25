import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import {EncryptProvider} from './context/EncryptContext'
import {MainProvider} from './context/MainContext'
import {ContactsProvider} from './context/ContactContext'
import {ConversationProvider} from './context/ConversationContext'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <EncryptProvider>
      <MainProvider>
        <ContactsProvider>
          <ConversationProvider>
            <Router>
              <App />
            </Router>
          </ConversationProvider>
        </ContactsProvider>    
      </MainProvider>  
    </EncryptProvider>
  </React.StrictMode>,
  document.getElementById('root')
);