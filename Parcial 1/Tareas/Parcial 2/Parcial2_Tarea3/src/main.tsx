import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyAppRecreada from './MyAppRecreada'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyAppRecreada/>
  </StrictMode>,
)
