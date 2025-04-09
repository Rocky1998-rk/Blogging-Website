import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { EmailContextProvider } from './components/emailContext/emailContext.jsx'
import { UserContextProvider } from './components/userContext/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
  <EmailContextProvider>
     <StrictMode>
      <App />
    </StrictMode>
  </EmailContextProvider>
  </UserContextProvider>
 
)
