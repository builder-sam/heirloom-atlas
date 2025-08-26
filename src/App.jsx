import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '@/styles/globals.css'

// Pages
import HomePage from '@/pages/HomePage'
import SaleDetailPage from '@/pages/SaleDetailPage'
import SavedPage from '@/pages/SavedPage'
import AboutPage from '@/pages/AboutPage'

// Layout
import Layout from '@/components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sale/:id" element={<SaleDetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
