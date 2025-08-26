import { useState, useEffect, useCallback } from 'react'
import api from '@/services/api'

// Hook for searching estate sales
export const useEstateSales = () => {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastSearchParams, setLastSearchParams] = useState(null)

  const searchSales = useCallback(async (searchParams) => {
    setLoading(true)
    setError(null)
    setLastSearchParams(searchParams)

    try {
      const response = await api.searchSales(searchParams)
      
      if (response.success) {
        setSales(response.data)
      } else {
        setError(response.error || 'Failed to load estate sales')
        setSales([])
      }
    } catch (err) {
      setError('Network error. Please try again.')
      setSales([])
      console.error('Estate sales search error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshSales = useCallback(() => {
    if (lastSearchParams) {
      searchSales(lastSearchParams)
    }
  }, [searchSales, lastSearchParams])

  return {
    sales,
    loading,
    error,
    searchSales,
    refreshSales
  }
}

// Hook for individual sale details
export const useSaleDetails = (saleId) => {
  const [sale, setSale] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!saleId) return

    const fetchSaleDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await api.getSaleDetails(saleId)
        
        if (response.success) {
          setSale(response.data)
        } else {
          setError(response.error || 'Failed to load sale details')
          setSale(null)
        }
      } catch (err) {
        setError('Network error. Please try again.')
        setSale(null)
        console.error('Sale details error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSaleDetails()
  }, [saleId])

  return {
    sale,
    loading,
    error,
    refetch: () => {
      if (saleId) {
        fetchSaleDetails()
      }
    }
  }
}

// Hook for geolocation
export const useGeolocation = () => {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        setLoading(false)
      },
      (err) => {
        setError('Unable to get your location. Please enable location services.')
        setLoading(false)
        console.error('Geolocation error:', err)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }, [])

  const geocodeAddress = useCallback(async (address) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.geocodeAddress(address)
      
      if (response.success) {
        setLocation(response.data)
      } else {
        setError(response.error || 'Address not found')
        setLocation(null)
      }
    } catch (err) {
      setError('Failed to find address')
      setLocation(null)
      console.error('Geocoding error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    location,
    loading,
    error,
    getCurrentLocation,
    geocodeAddress,
    clearLocation: () => setLocation(null)
  }
}

// Hook for saved sales (localStorage)
export const useSavedSales = () => {
  const [savedSales, setSavedSales] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('heirloom-atlas-saved')
    if (saved) {
      try {
        setSavedSales(JSON.parse(saved))
      } catch (err) {
        console.error('Error loading saved sales:', err)
        setSavedSales([])
      }
    }
  }, [])

  const toggleSave = useCallback((saleId) => {
    setSavedSales(prev => {
      const newSaved = prev.includes(saleId)
        ? prev.filter(id => id !== saleId)
        : [...prev, saleId]
      
      localStorage.setItem('heirloom-atlas-saved', JSON.stringify(newSaved))
      return newSaved
    })
  }, [])

  const removeSave = useCallback((saleId) => {
    setSavedSales(prev => {
      const newSaved = prev.filter(id => id !== saleId)
      localStorage.setItem('heirloom-atlas-saved', JSON.stringify(newSaved))
      return newSaved
    })
  }, [])

  const isSaved = useCallback((saleId) => {
    return savedSales.includes(saleId)
  }, [savedSales])

  return {
    savedSales,
    toggleSave,
    removeSave,
    isSaved
  }
}
