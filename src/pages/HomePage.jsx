import React, { useState, useEffect } from 'react'
import MapView from '@/components/MapView'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import SalesList from '@/components/SalesList'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    dates: 'this_weekend',
    distance: 25,
    type: 'all',
    priceRange: 'all',
    categories: []
  })
  const [showSalesList, setShowSalesList] = useState(false)
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <div className="home-page">
      <div className="map-container">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={() => {/* TODO: Handle search */}}
        />
        <FilterBar 
          filters={filters}
          onChange={setFilters}
        />
        <MapView 
          sales={sales}
          center={[42.3601, -71.0589]} // Default to Boston
          zoom={10}
        />
      </div>
      
      <SalesList 
        isOpen={showSalesList}
        onToggle={() => setShowSalesList(!showSalesList)}
        sales={sales}
        loading={loading}
      />
    </div>
  )
}

export default HomePage
