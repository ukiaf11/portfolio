import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // the shared base (tokens, glass, primitives, nav, footer)
import './styles/entry-home.css' // this page's sections, after the base

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
