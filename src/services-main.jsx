import React from 'react'
import { createRoot } from 'react-dom/client'
import ServicesApp from './ServicesApp.jsx'
import './index.css' // the shared base (tokens, glass, primitives, nav, footer)
import './styles/entry-services.css' // this page's sections, after the base

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ServicesApp />
  </React.StrictMode>
)
