import './assets/styles/obi-theme.css'
import './assets/styles/globals.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { registerBuiltInTemplates } from '@/features/templates/definitions'

registerBuiltInTemplates()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
