import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './src/App'
import './src/index.scss'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(React.createElement(StrictMode, null, <App />))
