import React, { useState, useRef } from 'react'
import { Search, MapPin, X } from 'lucide-react'

const SearchBar = ({ value, onChange, onSearch, onLocationRequest, placeholder = "Enter city, ZIP, or address" }) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch?.(value.trim())
    }
  }

  const handleClear = () => {
    onChange?.('')
    inputRef.current?.focus()
  }

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          onLocationRequest?.({ latitude, longitude })
        },
        (error) => {
          console.warn('Geolocation error:', error)
          // Could show user-friendly error message here
        }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className={`search-input-container ${isFocused ? 'focused' : ''}`}>
        <Search className="search-icon" size={20} />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search location"
        />
        
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear-btn"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
        
        <button
          type="button"
          onClick={handleLocationRequest}
          className="location-btn"
          aria-label="Use my location"
          title="Use my location"
        >
          <MapPin size={20} />
        </button>
      </div>
    </form>
  )
}

export default SearchBar
