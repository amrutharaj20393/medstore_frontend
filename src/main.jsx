import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Contextshare from './Context/Contextshare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='691132773803-3hfnu4ke6g2g174egptdh4roqddnp2vs.apps.googleusercontent.com'>
        <Contextshare><App /></Contextshare>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
