import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Header, Counter } from '@chat-ai/ui'

const App = () => (
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank"></a>
        <Header title="Web" />
        <div className="card">
            <Counter />
        </div>
    </div>
)

createRoot(document.getElementById('app')!).render(<App />)
