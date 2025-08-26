import React, { useState, useEffect } from 'react'
import MapView from '@/components/MapView'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import SalesList from '@/components/SalesList'
import { useEstateSales, useGeolocation, useSavedSales } from '@/hooks/useEstateSales'

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
  const [mapCenter, setMapCenter] = useState([42.3601, -71.0589]) // Default to Boston
  const [mapZoom, setMapZoom] = useState(10)

  // Hooks
  const { sales, loading, error, searchSales } = useEstateSales()
  const { location, getCurrentLocation, geocodeAddress } = useGeolocation()
  const { savedSales, toggleSave } = useSavedSales()

  // Initial load - search with default location and filters
  useEffect(() => {
    const initialSearch = {
      latitude: mapCenter[0],
      longitude: mapCenter[1],
      radius: filters.distance,
      query: searchQuery,
      filters
    }
    searchSales(initialSearch)
  }, [searchSales]) // Include searchSales dependency

  // Update search when filters change
  useEffect(() => {
    const currentLocation = location || { latitude: mapCenter[0], longitude: mapCenter[1] }
    const searchParams = {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      radius: filters.distance,
      query: searchQuery,
      filters
    }
    console.log('Searching with params:', searchParams) // Debug log
    searchSales(searchParams)
  }, [filters, location, searchSales])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    // Try to geocode the search query first
    await geocodeAddress(searchQuery)
    
    // The useEffect above will trigger the search with the new location
  }

  const handleLocationRequest = async (coords) => {
    if (coords) {
      setMapCenter([coords.latitude, coords.longitude])
      setMapZoom(12)
      
      const searchParams = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        radius: filters.distance,
        query: searchQuery,
        filters
      }
      searchSales(searchParams)
    } else {
      getCurrentLocation()
    }
  }

  const handleLocationFound = (coords) => {
    setMapCenter(coords)
    setMapZoom(12)
  }

  const handleSaleClick = (sale) => {
    // Open sales list and scroll to the sale
    setShowSalesList(true)
    // Could add logic to highlight the selected sale
  }

  // Show sales list when there are results
  useEffect(() => {
    if (sales.length > 0 && !showSalesList) {
      setShowSalesList(true)
    }
  }, [sales.length])

  return (
    <div className="home-page">
      <div className="map-container">
        <div className="search-overlay">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
            placeholder="Enter city, ZIP, or address"
          />
        </div>
        
        <div className="filter-overlay">
          <FilterBar 
            filters={filters}
            onChange={setFilters}
          />
        </div>
        
        <MapView 
          sales={sales}
          center={mapCenter}
          zoom={mapZoom}
          onSaleClick={handleSaleClick}
          onLocationFound={handleLocationFound}
        />
      </div>
      
      <SalesList 
        isOpen={showSalesList}
        onToggle={() => setShowSalesList(!showSalesList)}
        sales={sales}
        loading={loading}
        savedSales={savedSales}
        onSaveToggle={toggleSave}
      />

      {error && (
        <div className="error-toast">
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default HomePage
