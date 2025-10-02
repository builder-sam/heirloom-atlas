# Heirloom Atlas

**Find stories worth keeping** - Discover nearby estate sales, auctions, and antique liquidations.

A beautiful, fast, and accessible web application that helps collectors and treasure hunters find estate sales in their area. Built with React, Leaflet maps, and a thoughtful design system.

## Features

### 🗺️ **Interactive Map Interface**
- Full-screen map with estate sale locations
- Custom markers color-coded by date proximity
- Smooth pan and zoom controls
- Geolocation support with fallback

### 🔍 **Smart Search & Filtering**
- Location search with geocoding
- Filter by date range (today, weekend, custom)
- Distance radius control (5-100 miles)
- Sale type filtering (estate sales, auctions, online)
- Price range and category filters
- Real-time results with URL sharing

### 📋 **Estate Sale Listings**
- Collapsible side drawer with sale cards
- Distance calculation from your location
- Quick save functionality
- Detailed sale information
- Direct links to organizer contacts

### 📄 **Detailed Sale Pages**
- Photo galleries with thumbnails
- Complete sale information
- Contact details and directions
- Calendar integration
- Social sharing capabilities

### 💾 **Personal Collection**
- Save interesting sales for later
- Persistent local storage
- Organized by upcoming/past sales
- Easy removal and management

### 🎨 **Design Excellence**
- Dark, earthy color palette (charcoal, moss, clay, brass)
- Elegant typography (Cormorant serif + Inter sans)
- Generous spacing and clear hierarchy
- Fully responsive design
- Accessibility compliant (WCAG 2.1)

## Quick Start

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd heirloom-atlas
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys (optional for development)
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

## Environment Variables

Create a `.env` file in the root directory:

```bash
# EstateSales.NET API (Required for production)
VITE_ESTATE_SALES_API_KEY=your_api_key_here

# Mapbox Token (Optional - falls back to OpenStreetMap)
VITE_MAPBOX_TOKEN=your_mapbox_token_here

# API Configuration
VITE_ESTATE_SALES_API_URL=https://api.estatesales.net
VITE_DEFAULT_SEARCH_RADIUS_MILES=25
VITE_DEFAULT_MAP_ZOOM=10
```

### Development Mode

The app includes comprehensive mock data for development. You can explore all features without API keys:

- **Boston Area**: Default location with sample estate sales
- **Sample Categories**: Antiques, Mid-Century Modern, Tools, Jewelry
- **Mock Geocoding**: Works with Boston, Cambridge, Newton, etc.
- **Realistic Data**: Dates, distances, photos, and descriptions

## API Integration

### EstateSales.NET Integration

The app is designed to integrate with the [EstateSales.NET Public API](https://www.estatesales.net/developers):

1. **Sign up** for an API key at EstateSales.NET
2. **Add your key** to the `.env` file
3. **Review rate limits** in their documentation
4. **Follow attribution** requirements per their TOS

### Data Sources

- **Primary**: EstateSales.NET API
- **Geocoding**: Mapbox Geocoding API (optional)
- **Maps**: OpenStreetMap + Leaflet (free) or Mapbox (premium)
- **Attribution**: All data sources properly credited per TOS

## Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **Leaflet** - Interactive maps
- **Lucide React** - Beautiful icons
- **Date-fns** - Date manipulation

### Build & Development
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Modern CSS** - Custom properties, Grid, Flexbox

### Styling Architecture
- **Design Tokens** - Centralized colors, spacing, typography
- **Component CSS** - Modular, maintainable styles
- **Responsive Design** - Mobile-first approach
- **Dark Mode** - System preference support

## Sample Locations

Test the app with these locations (mock data included):

- **Boston, MA** (42.3601, -71.0589) - 5 sample sales
- **Cambridge, MA** (42.3736, -71.1097) - Mid-century modern focus
- **Newton, MA** (42.3370, -71.2092) - Antiques and fine art
- **Somerville, MA** (42.3876, -71.0995) - Tools and collectibles

## Performance Features

### Optimization
- **Image lazy loading** with proper aspect ratios
- **Virtualized lists** for large result sets
- **API response caching** for improved performance
- **Bundle splitting** for faster initial loads

### Accessibility
- **WCAG 2.1 AA compliant** color contrast (4.5:1+)
- **Keyboard navigation** for all interactive elements
- **Screen reader support** with proper ARIA labels
- **Focus management** with visible focus states
- **Reduced motion** support for accessibility preferences

### SEO & Social
- **Semantic HTML** structure
- **Meta tags** for social sharing
- **JSON-LD structured data** (where permitted by data TOS)
- **URL-based state** for shareable searches

## Browser Support

- **Modern browsers** (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+)
- **Progressive enhancement** for older browsers
- **Mobile responsive** (iOS Safari, Android Chrome)
- **Touch-friendly** interface with 44px minimum touch targets

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow code style**: Use existing patterns and conventions
4. **Test thoroughly**: Ensure responsive design and accessibility
5. **Submit a pull request**: Include description of changes

### Code Style Guidelines

- **Component naming**: PascalCase for components, camelCase for utilities
- **CSS conventions**: Follow existing token system and naming patterns
- **File organization**: Group by feature, separate concerns clearly
- **Accessibility first**: Always consider keyboard and screen reader users

## Legal & Data Usage

- **Respect API terms**: Follow all data provider terms of service
- **Proper attribution**: Credit data sources as required
- **Rate limiting**: Implement proper API rate limiting
- **User privacy**: No tracking without consent, minimal data collection

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for collectors and treasure hunters**

*Find stories worth keeping with Heirloom Atlas*
