import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Calendar, MapPin, Trash2, ExternalLink } from 'lucide-react'
import { useSavedSales } from '@/hooks/useEstateSales'
import api from '@/services/api'

const SavedSaleCard = ({ sale, onRemove }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays > 0 && diffDays <= 7) return `${diffDays} days`
    if (diffDays < 0) return 'Past'
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const isPast = new Date(sale.date) < new Date()

  return (
    <div className={`saved-sale-card ${isPast ? 'past' : ''}`}>
      <div className="saved-card-header">
        <span className={`sale-date-badge ${isPast ? 'past' : ''}`}>
          {formatDate(sale.date)}
        </span>
        <button
          className="remove-btn"
          onClick={() => onRemove(sale.id)}
          aria-label="Remove from saved"
          title="Remove from saved"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <Link to={`/sale/${sale.id}`} className="saved-card-link">
        <h3 className="saved-card-title">{sale.title}</h3>
        
        <div className="saved-card-details">
          <div className="saved-detail">
            <MapPin size={14} />
            <span>{sale.address}</span>
          </div>
          
          <div className="saved-detail">
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
          <div className="saved-card-tags">
            {sale.categories.slice(0, 3).map((category, index) => (
              <span key={index} className="saved-tag">
                {category}
              </span>
            ))}
            {sale.categories.length > 3 && (
              <span className="saved-tag-more">
                +{sale.categories.length - 3} more
              </span>
            )}
          </div>
        )}
      </Link>
      
      <div className="saved-card-actions">
        <Link to={`/sale/${sale.id}`} className="btn btn-ghost btn-sm">
          <ExternalLink size={14} />
          View Details
        </Link>
      </div>
    </div>
  )
}

const SavedPage = () => {
  const { savedSales, removeSave } = useSavedSales()
  const [salesData, setSalesData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSavedSalesData = async () => {
      if (savedSales.length === 0) {
        setLoading(false)
        return
      }

      setLoading(true)
      
      try {
        // Fetch details for each saved sale
        const salesPromises = savedSales.map(saleId => 
          api.getSaleDetails(saleId)
        )
        
        const salesResponses = await Promise.allSettled(salesPromises)
        
        const validSales = salesResponses
          .filter(response => response.status === 'fulfilled' && response.value.success)
          .map(response => response.value.data)
        
        // Sort by date - upcoming first, then past
        validSales.sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          const now = new Date()
          
          const aIsPast = dateA < now
          const bIsPast = dateB < now
          
          if (aIsPast && !bIsPast) return 1
          if (!aIsPast && bIsPast) return -1
          
          return dateA - dateB
        })
        
        setSalesData(validSales)
      } catch (error) {
        console.error('Error fetching saved sales:', error)
        setSalesData([])
      } finally {
        setLoading(false)
      }
    }

    fetchSavedSalesData()
  }, [savedSales])

  const handleRemove = (saleId) => {
    removeSave(saleId)
    setSalesData(prev => prev.filter(sale => sale.id !== saleId))
  }

  const upcomingSales = salesData.filter(sale => new Date(sale.date) >= new Date())
  const pastSales = salesData.filter(sale => new Date(sale.date) < new Date())

  return (
    <div className="saved-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title text-serif">Your Saved Sales</h1>
          <p className="page-subtitle">
            Keep track of estate sales that caught your interest
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading"></div>
            <p>Loading your saved sales...</p>
          </div>
        ) : savedSales.length === 0 ? (
          <div className="empty-state">
            <Heart size={48} className="empty-icon" />
            <div className="empty-state-title">No saved sales yet</div>
            <div className="empty-state-message">
              Start exploring estate sales and save the ones you're interested in. 
              Your saved sales will appear here for easy access.
            </div>
            <Link to="/" className="btn btn-primary">
              <MapPin size={16} />
              Explore Estate Sales
            </Link>
          </div>
        ) : (
          <div className="saved-content">
            {upcomingSales.length > 0 && (
              <section className="saved-section">
                <h2 className="section-title">
                  Upcoming Sales ({upcomingSales.length})
                </h2>
                <div className="saved-sales-grid">
                  {upcomingSales.map((sale) => (
                    <SavedSaleCard
                      key={sale.id}
                      sale={sale}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </section>
            )}

            {pastSales.length > 0 && (
              <section className="saved-section">
                <h2 className="section-title">
                  Past Sales ({pastSales.length})
                </h2>
                <div className="saved-sales-grid">
                  {pastSales.map((sale) => (
                    <SavedSaleCard
                      key={sale.id}
                      sale={sale}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedPage
