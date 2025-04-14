import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeContextProvider } from "./context/darkModeContext.jsx";
import { AuthContextProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
