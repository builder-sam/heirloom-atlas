import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Heart, Search } from 'lucide-react'

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
      alt: 'Vintage antique furniture collection',
      caption: 'Discover timeless treasures'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=1200&h=800&fit=crop',
      alt: 'Elegant vintage porcelain and china',
      caption: 'Every piece tells a story'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop',
      alt: 'Fine vintage jewelry and accessories',
      caption: 'Heirlooms of generations past'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
      alt: 'Classic vintage books and collectibles',
      caption: 'Stories worth keeping'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1200&h=800&fit=crop',
      alt: 'Beautiful vintage home decor',
      caption: 'Find your perfect piece'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.alt} />
            <div className="carousel-caption">
              <h3>{slide.caption}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous image">
        <ChevronLeft size={24} />
      </button>
      
      <button className="carousel-btn next" onClick={nextSlide} aria-label="Next image">
        <ChevronRight size={24} />
      </button>
      
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <ImageCarousel />
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title text-serif">Heirloom Atlas</h1>
            <p className="hero-tagline">Find stories worth keeping</p>
            <p className="hero-description">
              Discover nearby estate sales, auctions, and antique liquidations. 
              Connect with treasures that carry the stories of generations past.
            </p>
            <div className="hero-actions">
              <Link to="/map" className="btn btn-primary btn-large">
                <Search size={20} />
                Explore Estate Sales
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                <Heart size={20} />
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title text-serif">Every Treasure Has a Story</h2>
              <div className="story-paragraphs">
                <p>
                  In a world that moves increasingly fast, we believe in the enduring value of things 
                  made to last. Estate sales represent more than just transactions—they're the passing 
                  of stories, memories, and craftsmanship from one generation to the next.
                </p>
                <p>
                  Heirloom Atlas was born from the understanding that behind every antique dresser, 
                  vintage tea set, or hand-crafted tool lies a human story. These objects witnessed 
                  family dinners, milestone celebrations, and quiet everyday moments that shaped lives.
                </p>
                <p>
                  We created this platform to help treasure hunters and collectors connect with these 
                  meaningful pieces. Whether you're searching for the perfect vintage accent for your home, 
                  a rare collectible, or simply love the thrill of discovery, we're here to guide you to 
                  the stories worth keeping.
                </p>
                <blockquote className="founder-quote">
                  "Every antique is a time capsule, holding within it the essence of the era it represents. 
                  Our mission is to help these stories find their next chapter."
                  <cite>— Sam Weiner, Founder</cite>
                </blockquote>
              </div>
            </div>
            
            <div className="story-stats">
              <div className="stat-item">
                <h3>10,000+</h3>
                <p>Estate Sales Discovered</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Cities Covered</p>
              </div>
              <div className="stat-item">
                <h3>25,000+</h3>
                <p>Treasure Hunters Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title text-serif">How Heirloom Atlas Works</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-icon">
                <MapPin size={32} />
              </div>
              <h3>Discover</h3>
              <p>Search estate sales in your area using our interactive map and smart filters.</p>
            </div>
            
            <div className="step-item">
              <div className="step-icon">
                <Heart size={32} />
              </div>
              <h3>Save</h3>
              <p>Heart the sales that interest you and get organized for your treasure hunting adventures.</p>
            </div>
            
            <div className="step-item">
              <div className="step-icon">
                <Calendar size={32} />
              </div>
              <h3>Attend</h3>
              <p>Get directions, contact details, and never miss a sale with calendar integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title text-serif">Ready to Find Your Next Treasure?</h2>
            <p className="cta-description">
              Join thousands of collectors and antique enthusiasts who trust Heirloom Atlas 
              to guide them to the stories worth keeping.
            </p>
            <Link to="/map" className="btn btn-primary btn-large">
              <Search size={20} />
              Start Exploring
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
