import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Anim from './Anim.tsx'
import AppClones from './AppClones.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AppClones />
  // </StrictMode>,
)
