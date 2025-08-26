// Estate Sales API Service
// This includes mock data for development and interfaces for real API integration

// Mock data simulating EstateSales.NET API responses
// Generate dates relative to current date to ensure they show up in filters
const getCurrentDate = () => new Date()
const getTomorrowDate = () => new Date(Date.now() + 24 * 60 * 60 * 1000)
const getWeekendDate = () => {
  const today = new Date()
  const daysUntilSaturday = (6 - today.getDay()) % 7 || 7 // Get next Saturday
  return new Date(today.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000)
}
const getNextWeekDate = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

const mockSalesData = [
  {
    id: '1',
    title: 'Beautiful Victorian Estate Sale - Antiques & Fine Art',
    date: getCurrentDate().toISOString(),
    endDate: new Date(getCurrentDate().getTime() + 7 * 60 * 60 * 1000).toISOString(), // 7 hours later
    address: '123 Beacon Hill Street, Boston, MA 02108',
    latitude: 42.3584,
    longitude: -71.0598,
    distance: 2.3,
    organizer: 'Heritage Estate Sales',
    description: 'Magnificent Victorian estate featuring fine antiques, oil paintings, sterling silver, and period furniture.',
    categories: ['Antiques', 'Art', 'Furniture', 'Jewelry'],
    priceRange: '$$$',
    type: 'estate_sale',
    photos: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=400'
    ],
    featured: true
  },
  {
    id: '2',
    title: 'Mid-Century Modern Collection - Designer Furniture',
    date: getTomorrowDate().toISOString(),
    endDate: new Date(getTomorrowDate().getTime() + 7 * 60 * 60 * 1000).toISOString(),
    address: '456 Cambridge Street, Cambridge, MA 02139',
    latitude: 42.3736,
    longitude: -71.1097,
    distance: 5.8,
    organizer: 'Modern Estate Sales',
    description: 'Curated collection of authentic mid-century modern furniture, ceramics, and lighting.',
    categories: ['Mid-Century Modern', 'Furniture', 'Art', 'Collectibles'],
    priceRange: '$$',
    type: 'estate_sale',
    photos: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
    ]
  },
  {
    id: '3',
    title: 'Tool Collector\'s Dream - Vintage & Antique Tools',
    date: getWeekendDate().toISOString(),
    endDate: new Date(getWeekendDate().getTime() + 7 * 60 * 60 * 1000).toISOString(),
    address: '789 Salem Street, Medford, MA 02155',
    latitude: 42.4184,
    longitude: -71.1061,
    distance: 8.2,
    organizer: 'Boston Area Estate Sales',
    description: 'Extensive collection of vintage hand tools, woodworking equipment, and shop accessories.',
    categories: ['Tools', 'Vintage', 'Collectibles'],
    priceRange: '$',
    type: 'estate_sale',
    photos: []
  },
  {
    id: '4',
    title: 'Online Auction - Fine Jewelry & Watches',
    date: getWeekendDate().toISOString(),
    endDate: new Date(getWeekendDate().getTime() + 3 * 60 * 60 * 1000).toISOString(),
    address: 'Online Only',
    latitude: 42.3601,
    longitude: -71.0589,
    distance: 0,
    organizer: 'Premier Auctions',
    description: 'Curated selection of fine jewelry, vintage watches, and precious metals.',
    categories: ['Jewelry', 'Watches', 'Collectibles'],
    priceRange: '$$$',
    type: 'online',
    photos: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'
    ]
  },
  {
    id: '5',
    title: 'Country Home Estate - Furniture & Home Decor',
    date: getNextWeekDate().toISOString(),
    endDate: new Date(getNextWeekDate().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 day sale
    address: '321 Main Street, Concord, MA 01742',
    latitude: 42.4606,
    longitude: -71.3489,
    distance: 23.1,
    organizer: 'Country Estate Sales',
    description: 'Charming country home filled with rustic furniture, quilts, and Americana.',
    categories: ['Furniture', 'Vintage', 'Books', 'China'],
    priceRange: '$$',
    type: 'estate_sale',
    photos: []
  }
]

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Calculate distance between two points (simplified)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 3959 // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Filter sales based on criteria
const filterSales = (sales, filters, userLocation) => {
  return sales.filter(sale => {
    // Distance filter
    if (userLocation && sale.latitude && sale.longitude) {
      const distance = calculateDistance(
        userLocation.latitude, 
        userLocation.longitude,
        sale.latitude, 
        sale.longitude
      )
      sale.distance = distance
      if (distance > filters.distance) return false
    }

    // Date filter
    const saleDate = new Date(sale.date)
    const today = new Date()
    const thisWeekend = new Date(today.getTime() + (6 - today.getDay()) * 24 * 60 * 60 * 1000)
    
    switch (filters.dates) {
      case 'today':
        if (saleDate.toDateString() !== today.toDateString()) return false
        break
      case 'this_weekend':
        if (saleDate < today || saleDate > thisWeekend) return false
        break
      case 'next_week':
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        if (saleDate < today || saleDate > nextWeek) return false
        break
    }

    // Type filter
    if (filters.type !== 'all' && sale.type !== filters.type) return false

    // Price range filter
    if (filters.priceRange !== 'all' && sale.priceRange !== filters.priceRange) return false

    // Category filter
    if (filters.categories.length > 0) {
      const hasMatchingCategory = filters.categories.some(category =>
        sale.categories.some(saleCategory =>
          saleCategory.toLowerCase().includes(category.toLowerCase())
        )
      )
      if (!hasMatchingCategory) return false
    }

    return true
  })
}

// API Service Class
class EstatesalesAPI {
  constructor() {
    this.baseURL = import.meta.env.VITE_ESTATE_SALES_API_URL || 'https://api.estatesales.net'
    this.apiKey = import.meta.env.VITE_ESTATE_SALES_API_KEY
    this.useMockData = !this.apiKey || import.meta.env.DEV
  }

  async searchSales(searchParams = {}) {
    const {
      latitude,
      longitude,
      radius = 25,
      query = '',
      filters = {}
    } = searchParams

    await delay(800) // Simulate API call

    if (this.useMockData) {
      // Use mock data for development
      let filteredSales = [...mockSalesData]
      console.log('Initial mock sales count:', filteredSales.length) // Debug log

      // Apply search query
      if (query) {
        filteredSales = filteredSales.filter(sale =>
          sale.title.toLowerCase().includes(query.toLowerCase()) ||
          sale.address.toLowerCase().includes(query.toLowerCase()) ||
          sale.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
        )
        console.log('After query filter:', filteredSales.length) // Debug log
      }

      // Apply filters
      const userLocation = latitude && longitude ? { latitude, longitude } : null
      filteredSales = filterSales(filteredSales, filters, userLocation)
      console.log('After date/type/category filters:', filteredSales.length) // Debug log

      // Sort by distance if location provided
      if (userLocation) {
        filteredSales.sort((a, b) => (a.distance || 0) - (b.distance || 0))
      }

      console.log('Final filtered sales:', filteredSales) // Debug log

      return {
        success: true,
        data: filteredSales,
        total: filteredSales.length,
        page: 1,
        pages: 1
      }
    }

    // Real API implementation would go here
    try {
      const params = new URLSearchParams({
        lat: latitude,
        lng: longitude,
        radius: radius,
        q: query,
        api_key: this.apiKey
      })

      const response = await fetch(`${this.baseURL}/sales?${params}`)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        success: true,
        data: data.sales || [],
        total: data.total || 0,
        page: data.page || 1,
        pages: data.pages || 1
      }
    } catch (error) {
      console.error('Estate Sales API Error:', error)
      return {
        success: false,
        error: error.message,
        data: []
      }
    }
  }

  async getSaleDetails(saleId) {
    await delay(400) // Simulate API call

    if (this.useMockData) {
      const sale = mockSalesData.find(s => s.id === saleId)
      if (!sale) {
        return {
          success: false,
          error: 'Sale not found'
        }
      }

      return {
        success: true,
        data: {
          ...sale,
          fullDescription: sale.description + ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          terms: 'Cash and carry. All sales final. 10% buyer\'s premium.',
          contact: {
            phone: '(555) 123-4567',
            email: 'info@heritageestatesales.com',
            website: 'https://heritageestatesales.com'
          }
        }
      }
    }

    // Real API implementation
    try {
      const response = await fetch(`${this.baseURL}/sales/${saleId}?api_key=${this.apiKey}`)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        success: true,
        data: data.sale
      }
    } catch (error) {
      console.error('Estate Sales API Error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Geocoding service for address to coordinates
  async geocodeAddress(address) {
    // In a real implementation, you might use:
    // - Mapbox Geocoding API
    // - Google Geocoding API
    // - OpenStreetMap Nominatim
    
    await delay(300)
    
    // Mock geocoding for common cities
    const mockGeocoding = {
      'boston': { latitude: 42.3601, longitude: -71.0589 },
      'cambridge': { latitude: 42.3736, longitude: -71.1097 },
      'somerville': { latitude: 42.3876, longitude: -71.0995 },
      'newton': { latitude: 42.3370, longitude: -71.2092 },
      'brookline': { latitude: 42.3317, longitude: -71.1211 }
    }

    const normalizedAddress = address.toLowerCase()
    for (const [city, coords] of Object.entries(mockGeocoding)) {
      if (normalizedAddress.includes(city)) {
        return {
          success: true,
          data: coords
        }
      }
    }

    return {
      success: false,
      error: 'Address not found'
    }
  }
}

// Export singleton instance
export default new EstatesalesAPI()
