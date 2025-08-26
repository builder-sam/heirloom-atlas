import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <p className="footer-text">
              Discover nearby estate sales, auctions, and antique liquidations.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-heading">Links</h3>
            <nav className="footer-nav">
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/saved" className="footer-link">Saved Sales</Link>
              <a 
                href="#data-sources" 
                className="footer-link"
                aria-label="Data sources information"
              >
                Data Sources
              </a>
            </nav>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 Heirloom Atlas. Built with care for collectors and treasure hunters.
          </p>
          <p className="footer-attribution">
            Estate sale data provided by EstateSales.NET
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
