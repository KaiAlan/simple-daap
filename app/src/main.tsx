import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { SimpleStorageProvider } from './Context/SimpleStorageContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SimpleStorageProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </SimpleStorageProvider>
)
