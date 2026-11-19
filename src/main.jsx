import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Clarity from '@microsoft/clarity'
import './index.css'
import './i18n/config';
import App from './App.jsx'

if (import.meta.env.PROD) {
    Clarity.init('zg7b13vti7');
}

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
