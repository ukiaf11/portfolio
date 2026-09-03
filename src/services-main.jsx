import React from 'react'
import { createRoot } from 'react-dom/client'
import ServicesApp from './ServicesApp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ServicesApp />
  </React.StrictMode>
)
