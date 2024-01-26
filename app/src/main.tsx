import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// import { SimpleStorageProvider } from './Context/SimpleStorageContext.tsx';
import { RegistrationProvider } from './Context/RegistrationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RegistrationProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </RegistrationProvider>
)
