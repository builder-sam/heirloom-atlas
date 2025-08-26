import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Info } from 'lucide-react'

const Header = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1 className="logo-text text-serif">Heirloom Atlas</h1>
          <span className="tagline text-sans">Find stories worth keeping</span>
        </Link>
        
        {!isHomePage && (
          <nav className="nav">
            <Link to="/saved" className="nav-link" aria-label="Saved sales">
              <Heart size={20} />
              <span>Saved</span>
            </Link>
            <Link to="/about" className="nav-link" aria-label="About">
              <Info size={20} />
              <span>About</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
