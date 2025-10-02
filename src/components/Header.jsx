import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Info, Map } from 'lucide-react'

const Header = () => {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1 className="logo-text">Heirloom Atlas</h1>
          <span className="tagline text-sans">
            <p>
              <br />
            </p>
          </span>
        </Link>

        <nav className="nav">
          {!isLandingPage && (
            <Link to="/map" className="nav-link" aria-label="Explore estate sales">
              <Map size={20} />
              <span>Explore</span>
            </Link>
          )}
          <Link to="/saved" className="nav-link" aria-label="Saved sales">
            <Heart size={20} />
            <span>Saved</span>
          </Link>
          <Link to="/about" className="nav-link" aria-label="About">
            <Info size={20} />
            <span>About</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
