import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyFirstApp from './MyFirstApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyFirstApp/>
  </StrictMode>,
)
