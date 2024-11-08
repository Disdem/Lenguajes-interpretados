import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CreateCards from './CreateCards'
import 'bootstrap/dist/css/bootstrap-grid.rtl.min.css'
import './style/index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CreateCards/>
  </StrictMode>,
);
