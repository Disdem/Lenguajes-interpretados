import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRickMorty from './AppRickMorty'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRickMorty/>
  </StrictMode>,
)
