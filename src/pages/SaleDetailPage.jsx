import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink, 
  Heart,
  Share2,
  Navigation
} from 'lucide-react'
import { useSaleDetails, useSavedSales } from '@/hooks/useEstateSales'

const ImageGallery = ({ photos = [], title }) => {
  const [currentImage, setCurrentImage] = useState(0)

  if (!photos.length) {
    return (
      <div className="image-gallery-placeholder">
        <div className="placeholder-content">
          <Calendar size={48} />
          <p>No photos available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img 
          src={photos[currentImage]} 
          alt={`${title} - Image ${currentImage + 1}`}
          loading="lazy"
        />
      </div>
      
      {photos.length > 1 && (
        <div className="image-thumbnails">
          {photos.map((photo, index) => (
            <button
              key={index}
              className={`thumbnail ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            >
              <img src={photo} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const SaleDetailPage = () => {
  const { id } = useParams()
  const { sale, loading, error } = useSaleDetails(id)
  const { savedSales, toggleSave } = useSavedSales()
  
  const isSaved = savedSales.includes(id)

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sale.title,
          text: `Check out this estate sale: ${sale.title}`,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const openDirections = () => {
    const query = encodeURIComponent(sale.address)
    window.open(`https://maps.google.com/?q=${query}`, '_blank')
  }

  const addToCalendar = () => {
    const startDate = new Date(sale.date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const endDate = sale.endDate ? new Date(sale.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : startDate
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(sale.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(sale.description)}&location=${encodeURIComponent(sale.address)}`
    
    window.open(calendarUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="sale-detail-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading"></div>
            <p>Loading sale details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !sale) {
    return (
      <div className="sale-detail-page">
        <div className="container">
          <div className="error-state">
            <h1>Sale Not Found</h1>
            <p>{error || 'The estate sale you\'re looking for could not be found.'}</p>
            <Link to="/" className="btn btn-primary">
              <ArrowLeft size={16} />
              Back to Map
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sale-detail-page">
      <div className="sale-detail-container">
        {/* Header */}
        <div className="sale-detail-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Map
          </Link>
          
          <div className="header-actions">
            <button 
              className={`save-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => toggleSave(id)}
              aria-label={isSaved ? 'Remove from saved' : 'Save sale'}
            >
              <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            
            <button 
              className="share-btn"
              onClick={handleShare}
              aria-label="Share sale"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="sale-detail-content">
          {/* Gallery */}
          <div className="sale-gallery">
            <ImageGallery photos={sale.photos} title={sale.title} />
          </div>

          {/* Info Panel */}
          <div className="sale-info">
            <div className="sale-header">
              <h1 className="text-serif">{sale.title}</h1>
              <p className="organizer">by {sale.organizer}</p>
            </div>

            {/* Key Details */}
            <div className="sale-details-grid">
              <div className="detail-item">
                <Calendar className="detail-icon" size={20} />
                <div>
                  <div className="detail-label">Date & Time</div>
                  <div className="detail-value">
                    {formatDateTime(sale.date)}
                    {sale.endDate && (
                      <div className="end-time">
                        Until {new Date(sale.endDate).toLocaleDateString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="detail-item">
                <MapPin className="detail-icon" size={20} />
                <div>
                  <div className="detail-label">Location</div>
                  <div className="detail-value">{sale.address}</div>
                  {sale.distance && (
                    <div className="distance">{sale.distance.toFixed(1)} miles away</div>
                  )}
                </div>
              </div>

              {sale.contact && (
                <>
                  {sale.contact.phone && (
                    <div className="detail-item">
                      <Phone className="detail-icon" size={20} />
                      <div>
                        <div className="detail-label">Phone</div>
                        <div className="detail-value">
                          <a href={`tel:${sale.contact.phone}`}>{sale.contact.phone}</a>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {sale.contact.email && (
                    <div className="detail-item">
                      <Mail className="detail-icon" size={20} />
                      <div>
                        <div className="detail-label">Email</div>
                        <div className="detail-value">
                          <a href={`mailto:${sale.contact.email}`}>{sale.contact.email}</a>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Categories */}
            {sale.categories && sale.categories.length > 0 && (
              <div className="sale-categories">
                <h3>Categories</h3>
                <div className="category-tags">
                  {sale.categories.map((category, index) => (
                    <span key={index} className="category-tag">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="sale-description">
              <h3>Description</h3>
              <p>{sale.fullDescription || sale.description}</p>
            </div>

            {/* Terms */}
            {sale.terms && (
              <div className="sale-terms">
                <h3>Terms & Conditions</h3>
                <p>{sale.terms}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn btn-primary" onClick={openDirections}>
                <Navigation size={16} />
                Get Directions
              </button>
              
              <button className="btn btn-secondary" onClick={addToCalendar}>
                <Calendar size={16} />
                Add to Calendar
              </button>
              
              {sale.contact?.website && (
                <a 
                  href={sale.contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <ExternalLink size={16} />
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaleDetailPage
