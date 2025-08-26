import React from 'react'

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="text-serif">About Heirloom Atlas</h1>
        <div className="about-content">
          <p>
            Heirloom Atlas helps you discover nearby estate sales, auctions, and antique liquidations. 
            Our mission is simple: help you find stories worth keeping.
          </p>
          
          <h2 className="text-serif">How It Works</h2>
          <p>
            Simply open the map, search for your area, and filter by date, distance, type, and categories 
            to find estate sales that match your interests. Save sales to your personal atlas and set up 
            alerts for new sales in your area.
          </p>
          
          <h2 className="text-serif">Data Sources</h2>
          <p>
            Estate sale data is provided by EstateSales.NET and other official sources. 
            We respect all data provider terms of service and attribution requirements.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
