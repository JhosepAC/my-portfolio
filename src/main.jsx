import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config';
import App from './App.jsx'

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)