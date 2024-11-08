import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Tarea4React from './Tarea4React'
import './index.css'
import './Styles/CreateLetter.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Tarea4React/>
  </StrictMode>,
)
