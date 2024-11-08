import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppBase from './AppBase'
import Tarea from './Tarea'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Tarea />
  // </StrictMode>
)
