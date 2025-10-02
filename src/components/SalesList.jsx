import React from 'react'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Heart, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const SaleCard = ({ sale, onSaveToggle, isSaved = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays > 0 && diffDays <= 7) return `${diffDays} days`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatDistance = (miles) => {
    if (miles < 1) return `${(miles * 5280).toFixed(0)} ft`
    return `${miles.toFixed(1)} mi`
  }

  return (
    <div className="sale-card">
      <div className="sale-card-header">
        <span className="sale-card-date">
          {formatDate(sale.date)}
        </span>
        <button
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={() => onSaveToggle?.(sale.id)}
          aria-label={isSaved ? 'Remove from saved' : 'Save sale'}
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <Link to={`/sale/${sale.id}`} className="sale-card-link">
        <h3 className="sale-card-title">{sale.title}</h3>
        
        <div className="sale-card-details">
          <div className="sale-detail">
            <MapPin size={14} />
            <span>{sale.address}</span>
            <span className="distance">• {formatDistance(sale.distance)}</span>
          </div>
          
          <div className="sale-detail">
            <Calendar size={14} />
            <span>
              {new Date(sale.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
        
        {sale.categories && sale.categories.length > 0 && (
          <div className="sale-card-tags">
            {sale.categories.slice(0, 3).map((category, index) => (
              <span key={index} className="sale-tag">
                {category}
              </span>
            ))}
            {sale.categories.length > 3 && (
              <span className="sale-tag-more">
                +{sale.categories.length - 3} more
              </span>
            )}
          </div>
        )}
      </Link>
      
      <div className="sale-card-actions">
        <Link to={`/sale/${sale.id}`} className="btn btn-ghost btn-sm">
          <ExternalLink size={14} />
          Details
        </Link>
      </div>
    </div>
  )
}

const SalesList = ({ 
  isOpen, 
  onToggle, 
  sales = [], 
  loading = false,
  savedSales = [],
  onSaveToggle 
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="sales-list-backdrop"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
      
      <div className={`sales-list ${isOpen ? 'open' : ''}`}>
        <button
          className="sales-list-toggle"
          onClick={onToggle}
          aria-label={isOpen ? 'Close sales list' : 'Open sales list'}
        >
          {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        
        <div className="sales-list-header">
          <h2 className="sales-list-title">
            Estate Sales
            {sales.length > 0 && (
              <span className="sales-count"> ({sales.length})</span>
            )}
          </h2>
        </div>
        
        <div className="sales-list-content">
          {loading ? (
            <div className="loading-state">
              <div className="loading"></div>
              <p>Finding estate sales...</p>
            </div>
          ) : sales.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-title">No sales found</div>
              <div className="empty-state-message">
                Try adjusting your search location or filters to find estate sales in your area.
              </div>
            </div>
          ) : (
            <div className="sales-grid">
              {sales.map((sale) => (
                <SaleCard
                  key={sale.id}
                  sale={sale}
                  isSaved={savedSales.includes(sale.id)}
                  onSaveToggle={onSaveToggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SalesList
