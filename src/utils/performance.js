// Performance optimization utilities

// Debounce function for search input
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Image lazy loading helper
export const createImageObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  }

  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, { ...defaultOptions, ...options })
  }
  
  return null
}

// Preload critical images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Memory usage monitor (development only)
export const logMemoryUsage = () => {
  if (process.env.NODE_ENV !== 'development' || !performance.memory) return
  
  const memory = performance.memory
  console.log('Memory Usage:', {
    used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
    total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
    limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`
  })
}

// Performance metrics
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now()
    const result = await fn(...args)
    const end = performance.now()
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${end - start} milliseconds`)
    }
    
    return result
  }
}

// Bundle size analyzer (development only)
export const logBundleInfo = () => {
  if (process.env.NODE_ENV !== 'development') return
  
  const navigation = performance.getEntriesByType('navigation')[0]
  if (navigation) {
    console.log('Bundle Performance:', {
      domContentLoaded: `${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`,
      loadComplete: `${navigation.loadEventEnd - navigation.loadEventStart}ms`,
      transferSize: navigation.transferSize ? `${Math.round(navigation.transferSize / 1024)}KB` : 'Unknown'
    })
  }
}

// Viewport utilities for responsive design
export const getViewportSize = () => ({
  width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
})

export const isMobile = () => getViewportSize().width <= 768
export const isTablet = () => {
  const width = getViewportSize().width
  return width > 768 && width <= 1024
}
export const isDesktop = () => getViewportSize().width > 1024

// Touch device detection
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// Reduced motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// High contrast preference
export const prefersHighContrast = () => {
  return window.matchMedia('(prefers-contrast: high)').matches
}

// Dark mode preference
export const prefersDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Cache utilities
class SimpleCache {
  constructor(maxSize = 50, ttl = 300000) { // 5 minutes default TTL
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttl
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    })
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.value
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}

export const createCache = (maxSize, ttl) => new SimpleCache(maxSize, ttl)

// API response caching
export const apiCache = createCache(100, 600000) // 10 minutes for API responses

// Geolocation caching
export const locationCache = createCache(10, 1800000) // 30 minutes for locations

// Error boundary helper
export const captureException = (error, context = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Application Error:', error, context)
  }
  
  // In production, you might want to send to error reporting service
  // Example: Sentry.captureException(error, { extra: context })
}

// Performance monitoring
export const trackPageView = (path) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Page view: ${path}`)
  }
  
  // In production, send to analytics
  // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: path })
}

export const trackEvent = (action, category, label, value) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Event: ${action} | ${category} | ${label} | ${value}`)
  }
  
  // In production, send to analytics
  // Example: gtag('event', action, { event_category: category, event_label: label, value })
}

// Resource loading optimization
export const loadResourceWhenIdle = (loadFn) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadFn)
  } else {
    setTimeout(loadFn, 1)
  }
}

// Critical resource preloading
export const preloadCriticalResources = () => {
  // Preload fonts
  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
  ]
  
  fontUrls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = url
    document.head.appendChild(link)
  })
}

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'development') {
    // Log initial bundle info
    if (document.readyState === 'complete') {
      logBundleInfo()
    } else {
      window.addEventListener('load', logBundleInfo)
    }
    
    // Log memory usage periodically
    setInterval(logMemoryUsage, 30000) // Every 30 seconds
  }
}
