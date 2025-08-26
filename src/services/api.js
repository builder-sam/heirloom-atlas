// Estate Sales API Service
// This includes mock data for development and interfaces for real API integration

// Mock data simulating EstateSales.NET API responses
// Generate dates relative to current date to ensure they show up in filters
const getCurrentDate = () => {
  const now = new Date()
  console.log('Current date for mock data:', now.toISOString())
  return now
}
const getTomorrowDate = () => {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
  console.log('Tomorrow date for mock data:', tomorrow.toISOString())
  return tomorrow
}
const getWeekendDate = () => {
  const today = new Date()
  const daysUntilSaturday = (6 - today.getDay()) % 7 || 7 // Get next Saturday
  const weekend = new Date(today.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000)
  console.log('Weekend date for mock data:', weekend.toISOString())
  return weekend
}
const getNextWeekDate = () => {
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  console.log('Next week date for mock data:', nextWeek.toISOString())
  return nextWeek
}

// Force regeneration of dates on each module load
const generateMockSalesData = () => [
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

// Generate fresh mock data
const mockSalesData = generateMockSalesData()

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
      case 'custom':
        if (filters.customDateRange && filters.customDateRange.startDate && filters.customDateRange.endDate) {
          const startDate = new Date(filters.customDateRange.startDate)
          const endDate = new Date(filters.customDateRange.endDate)
          // Set end date to end of day for inclusive range
          endDate.setHours(23, 59, 59, 999)
          if (saleDate < startDate || saleDate > endDate) return false
        }
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
      // Use mock data for development - regenerate fresh data each time
      const freshMockData = generateMockSalesData()
      let filteredSales = [...freshMockData]
      console.log('Initial mock sales count:', filteredSales.length) // Debug log
      console.log('Mock sales data:', filteredSales.map(s => ({ id: s.id, title: s.title, date: s.date }))) // Debug log

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

    console.log('Geocoding address:', address) // Debug log

    // Mock geocoding for common cities and zip codes
    const mockGeocoding = {
      // Cities
      'boston': { latitude: 42.3601, longitude: -71.0589 },
      'cambridge': { latitude: 42.3736, longitude: -71.1097 },
      'somerville': { latitude: 42.3876, longitude: -71.0995 },
      'newton': { latitude: 42.3370, longitude: -71.2092 },
      'brookline': { latitude: 42.3317, longitude: -71.1211 },
      'medford': { latitude: 42.4184, longitude: -71.1061 },
      'concord': { latitude: 42.4606, longitude: -71.3489 },
      'watertown': { latitude: 42.3668, longitude: -71.1834 },
      'arlington': { latitude: 42.4162, longitude: -71.1564 },
      'belmont': { latitude: 42.3959, longitude: -71.1786 },

      // Boston area zip codes
      '02108': { latitude: 42.3584, longitude: -71.0598 }, // Beacon Hill
      '02109': { latitude: 42.3647, longitude: -71.0542 }, // North End
      '02110': { latitude: 42.3584, longitude: -71.0598 }, // Financial District
      '02111': { latitude: 42.3505, longitude: -71.0621 }, // Chinatown
      '02113': { latitude: 42.3647, longitude: -71.0542 }, // North End
      '02114': { latitude: 42.3584, longitude: -71.0598 }, // Beacon Hill
      '02115': { latitude: 42.3467, longitude: -71.0972 }, // Back Bay
      '02116': { latitude: 42.3505, longitude: -71.0621 }, // Back Bay
      '02118': { latitude: 42.3396, longitude: -71.0720 }, // South End
      '02119': { latitude: 42.3296, longitude: -71.0833 }, // Roxbury
      '02120': { latitude: 42.3296, longitude: -71.0833 }, // Mission Hill
      '02121': { latitude: 42.3182, longitude: -71.0856 }, // Dorchester
      '02122': { latitude: 42.2793, longitude: -71.0569 }, // Dorchester
      '02124': { latitude: 42.2927, longitude: -71.0569 }, // Dorchester
      '02125': { latitude: 42.3182, longitude: -71.0856 }, // Dorchester
      '02127': { latitude: 42.3396, longitude: -71.0469 }, // South Boston
      '02128': { latitude: 42.3884, longitude: -71.0275 }, // East Boston
      '02129': { latitude: 42.3884, longitude: -71.0694 }, // Charlestown
      '02130': { latitude: 42.3209, longitude: -71.1175 }, // Jamaica Plain
      '02131': { latitude: 42.3010, longitude: -71.1225 }, // Roslindale
      '02132': { latitude: 42.2793, longitude: -71.1569 }, // West Roxbury
      '02134': { latitude: 42.3534, longitude: -71.1356 }, // Allston
      '02135': { latitude: 42.3534, longitude: -71.1278 }, // Brighton
      '02136': { latitude: 42.2704, longitude: -71.1275 }, // Hyde Park
      '02139': { latitude: 42.3736, longitude: -71.1097 }, // Cambridge
      '02140': { latitude: 42.3736, longitude: -71.1097 }, // Cambridge
      '02141': { latitude: 42.3736, longitude: -71.1097 }, // Cambridge
      '02142': { latitude: 42.3656, longitude: -71.0956 }, // Cambridge
      '02143': { latitude: 42.3876, longitude: -71.0995 }, // Somerville
      '02144': { latitude: 42.3876, longitude: -71.0995 }, // Somerville
      '02145': { latitude: 42.3876, longitude: -71.0995 }, // Somerville
      '02146': { latitude: 42.3317, longitude: -71.1211 }, // Brookline
      '02147': { latitude: 42.3317, longitude: -71.1211 }, // Brookline
      '02148': { latitude: 42.4037, longitude: -70.9920 }, // Malden
      '02149': { latitude: 42.4008, longitude: -71.0903 }, // Everett
      '02150': { latitude: 42.4037, longitude: -70.9920 }, // Chelsea
      '02151': { latitude: 42.4037, longitude: -70.9787 }, // Revere
      '02152': { latitude: 42.4240, longitude: -70.9495 }, // Winthrop
      '02153': { latitude: 42.4184, longitude: -71.1061 }, // Medford
      '02154': { latitude: 42.4184, longitude: -71.1061 }, // Medford
      '02155': { latitude: 42.4184, longitude: -71.1061 }, // Medford
      '02156': { latitude: 42.4184, longitude: -71.1061 }, // Medford
      '02158': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02159': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02160': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02161': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02162': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02163': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02164': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02165': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02166': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02167': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02168': { latitude: 42.3370, longitude: -71.2092 }, // Newton
      '02169': { latitude: 42.2681, longitude: -71.0611 }, // Quincy
      '02170': { latitude: 42.2681, longitude: -71.0611 }, // Quincy
      '02171': { latitude: 42.2681, longitude: -71.0611 }, // Quincy
      '02172': { latitude: 42.3668, longitude: -71.1834 }, // Watertown
      '02173': { latitude: 42.3237, longitude: -71.2092 }, // Lexington
      '02174': { latitude: 42.4162, longitude: -71.1564 }, // Arlington
      '02175': { latitude: 42.4162, longitude: -71.1564 }, // Arlington
      '02176': { latitude: 42.4162, longitude: -71.1564 }, // Arlington
      '02177': { latitude: 42.4184, longitude: -71.1061 }, // Medford
      '02178': { latitude: 42.3959, longitude: -71.1786 }, // Belmont
      '01742': { latitude: 42.4606, longitude: -71.3489 }  // Concord
    }

    const normalizedAddress = address.toLowerCase().trim()
    console.log('Normalized address:', normalizedAddress) // Debug log

    // First try exact zip code match
    if (mockGeocoding[normalizedAddress]) {
      console.log('Found exact zip code match:', mockGeocoding[normalizedAddress]) // Debug log
      return {
        success: true,
        data: mockGeocoding[normalizedAddress]
      }
    }

    // Then try city name match
    for (const [key, coords] of Object.entries(mockGeocoding)) {
      if (normalizedAddress.includes(key)) {
        console.log('Found city name match:', key, coords) // Debug log
        return {
          success: true,
          data: coords
        }
      }
    }

    console.log('No geocoding match found for:', address) // Debug log
    return {
      success: false,
      error: 'Address not found'
    }
  }
}

// Export singleton instance
export default new EstatesalesAPI()
