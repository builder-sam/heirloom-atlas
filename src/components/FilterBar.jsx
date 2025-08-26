import React, { useState } from 'react'
import { ChevronDown, Calendar, MapPin, DollarSign, Tag, Filter } from 'lucide-react'

const FilterPill = ({ label, icon: Icon, isActive, onClick, children }) => {
  return (
    <div className="filter-pill-container">
      <button
        className={`filter-pill ${isActive ? 'active' : ''}`}
        onClick={onClick}
        aria-expanded={isActive}
        aria-haspopup="true"
      >
        {Icon && <Icon size={16} />}
        <span>{label}</span>
        <ChevronDown size={14} className={`chevron ${isActive ? 'rotated' : ''}`} />
      </button>
      
      {isActive && (
        <div className="filter-dropdown">
          {children}
        </div>
      )}
    </div>
  )
}

const FilterBar = ({ filters, onChange }) => {
  const [activeFilter, setActiveFilter] = useState(null)
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  })

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName)
  }

  const updateFilter = (key, value) => {
    if (key === 'dates' && value === 'custom') {
      // Don't close dropdown for custom dates - need to select range
      onChange?.({ ...filters, [key]: value })
      return
    }
    onChange?.({ ...filters, [key]: value })
    setActiveFilter(null)
  }

  const updateCustomDateRange = (field, value) => {
    const newRange = { ...customDateRange, [field]: value }
    setCustomDateRange(newRange)

    // Update filters with custom range when both dates are selected
    if (newRange.startDate && newRange.endDate) {
      onChange?.({
        ...filters,
        dates: 'custom',
        customDateRange: newRange
      })
      setActiveFilter(null)
    }
  }

  const updateCategories = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    onChange?.({ ...filters, categories: newCategories })
  }

  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: 'this_weekend', label: 'This Weekend' },
    { value: 'next_week', label: 'Next Week' },
    { value: 'custom', label: 'Custom Range' }
  ]

  const distanceOptions = [
    { value: 5, label: '5 miles' },
    { value: 10, label: '10 miles' },
    { value: 25, label: '25 miles' },
    { value: 50, label: '50 miles' },
    { value: 100, label: '100 miles' }
  ]

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'estate_sale', label: 'Estate Sales' },
    { value: 'auction', label: 'Auctions' },
    { value: 'online', label: 'Online Only' }
  ]

  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: '$', label: '$' },
    { value: '$$', label: '$$' },
    { value: '$$$', label: '$$$' }
  ]

  const categoryOptions = [
    'Furniture', 'Art', 'Jewelry', 'Tools', 'Books', 'China',
    'Mid-Century Modern', 'Antiques', 'Collectibles', 'Vintage'
  ]

  return (
    <div className="filter-bar">
      <div className="filter-pills">
        <FilterPill
          label={`Dates: ${dateOptions.find(opt => opt.value === filters.dates)?.label || 'This Weekend'}`}
          icon={Calendar}
          isActive={activeFilter === 'dates'}
          onClick={() => toggleFilter('dates')}
        >
          <div className="filter-options">
            {dateOptions.map(option => (
              <button
                key={option.value}
                className={`filter-option ${filters.dates === option.value ? 'selected' : ''}`}
                onClick={() => updateFilter('dates', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FilterPill>

        <FilterPill
          label={`${filters.distance} miles`}
          icon={MapPin}
          isActive={activeFilter === 'distance'}
          onClick={() => toggleFilter('distance')}
        >
          <div className="filter-options">
            {distanceOptions.map(option => (
              <button
                key={option.value}
                className={`filter-option ${filters.distance === option.value ? 'selected' : ''}`}
                onClick={() => updateFilter('distance', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FilterPill>

        <FilterPill
          label={typeOptions.find(opt => opt.value === filters.type)?.label || 'All Types'}
          icon={Filter}
          isActive={activeFilter === 'type'}
          onClick={() => toggleFilter('type')}
        >
          <div className="filter-options">
            {typeOptions.map(option => (
              <button
                key={option.value}
                className={`filter-option ${filters.type === option.value ? 'selected' : ''}`}
                onClick={() => updateFilter('type', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FilterPill>

        <FilterPill
          label={priceOptions.find(opt => opt.value === filters.priceRange)?.label || 'All Prices'}
          icon={DollarSign}
          isActive={activeFilter === 'price'}
          onClick={() => toggleFilter('price')}
        >
          <div className="filter-options">
            {priceOptions.map(option => (
              <button
                key={option.value}
                className={`filter-option ${filters.priceRange === option.value ? 'selected' : ''}`}
                onClick={() => updateFilter('priceRange', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FilterPill>

        <FilterPill
          label={`Categories${filters.categories.length > 0 ? ` (${filters.categories.length})` : ''}`}
          icon={Tag}
          isActive={activeFilter === 'categories'}
          onClick={() => toggleFilter('categories')}
        >
          <div className="filter-options categories-grid">
            {categoryOptions.map(category => (
              <button
                key={category}
                className={`filter-option ${filters.categories.includes(category) ? 'selected' : ''}`}
                onClick={() => updateCategories(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </FilterPill>
      </div>
    </div>
  )
}

export default FilterBar
