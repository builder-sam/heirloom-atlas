import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { RotateCcw } from 'lucide-react'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom map controller component
const MapController = ({ center, zoom, onLocationFound }) => {
  const map = useMap()

  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom)
    }
  }, [map, center, zoom])

  const resetToUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const userLocation = [latitude, longitude]
          map.setView(userLocation, 12)
          onLocationFound?.(userLocation)
        },
        (error) => {
          console.warn('Geolocation error:', error)
          // Fallback to default location (Boston)
          map.setView([42.3601, -71.0589], 10)
        }
      )
    }
  }

  return (
    <button 
      className="map-reset-btn"
      onClick={resetToUserLocation}
      aria-label="Reset map to my location"
    >
      <RotateCcw size={20} />
      <span className="sr-only">Reset to my location</span>
    </button>
  )
}

const MapView = ({ 
  sales = [], 
  center = [42.3601, -71.0589], 
  zoom = 10,
  onSaleClick,
  onLocationFound 
}) => {
  const mapRef = useRef(null)

  // Create custom markers for different sale types
  const createSaleMarker = (sale) => {
    const today = new Date()
    const saleDate = new Date(sale.date)
    const daysUntilSale = Math.ceil((saleDate - today) / (1000 * 60 * 60 * 24))
    
    let color = '#7A5C44' // Default clay color
    if (daysUntilSale <= 0) {
      color = '#C9A86A' // Brass for today/ongoing
    } else if (daysUntilSale <= 3) {
      color = '#2E3A2F' // Moss for soon
    }

    return L.divIcon({
      className: 'custom-sale-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          color: white;
        ">
          ${daysUntilSale <= 0 ? '!' : daysUntilSale <= 3 ? '●' : '○'}
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    })
  }

  return (
    <div className="map-view">
      <MapContainer
        center={center}
        zoom={zoom}
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        
        {/* Render sale markers */}
        {sales.map((sale) => (
          <Marker
            key={sale.id}
            position={[sale.latitude, sale.longitude]}
            icon={createSaleMarker(sale)}
            eventHandlers={{
              click: () => onSaleClick?.(sale)
            }}
          >
            <Popup>
              <div className="sale-popup">
                <h3 className="sale-popup-title">{sale.title}</h3>
                <p className="sale-popup-date">
                  {new Date(sale.date).toLocaleDateString()}
                </p>
                <p className="sale-popup-address">{sale.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController 
          center={center} 
          zoom={zoom} 
          onLocationFound={onLocationFound}
        />
      </MapContainer>
    </div>
  )
}

export default MapView
