import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import {MainProvider} from './context/MainContext'
import {ContactsProvider} from './context/ContactContext'
import {ConversationProvider} from './context/ConversationContext'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <MainProvider>
      <ContactsProvider>
        <ConversationProvider>
          <Router>
            <App />
          </Router>
      </ConversationProvider>
      </ContactsProvider>    
    </MainProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);