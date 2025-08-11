import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeProvider from './context/useTheme.tsx'
import ExtensionProvider from './context/useExtensions.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ExtensionProvider>
        <App />
      </ExtensionProvider>
    </ThemeProvider>
  </StrictMode>,
)
