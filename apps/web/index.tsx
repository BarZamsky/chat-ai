import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './src/App'
import { ClerkProvider } from '@clerk/clerk-react'

import './globals.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(React.createElement(StrictMode, null,
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
    </ClerkProvider>
))
