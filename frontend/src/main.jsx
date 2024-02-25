import React from 'react'
import ReactDOM from 'react-dom/client'



import axios from '../axiosConfig.jsx';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './UserContext.jsx'
import { TokenProvider } from '../TokenContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <TokenProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App axiosInstance={axios} />
        </React.StrictMode>
      </BrowserRouter>
    </TokenProvider>
  </UserContextProvider>
)
