import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import './styles/components.css'
import './styles/pages.css'
import './styles/map.css'
import './styles/search-filter.css'
import './styles/sales-list.css'
import './styles/sale-detail.css'
import './styles/saved-page.css'
import './styles/notifications.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
