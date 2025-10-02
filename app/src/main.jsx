import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/App'
import { AppProvider } from './state/AppStateContext'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)
