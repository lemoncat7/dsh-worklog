import React from 'react'
import { createRoot } from 'react-dom/client'
import { Workspace } from '../src/ui/Workspace.jsx'
import css from '../src/client.css'
import embeddedCss from '../src/web-embedded.css'
const style = document.createElement('style'); style.textContent = css + embeddedCss; document.head.append(style)
createRoot(document.getElementById('root')).render(<Workspace close={() => {}} />)
