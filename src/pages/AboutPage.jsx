import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Calendar, Star } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1 className="page-title">About Heirloom Atlas</h1>
          <p className="page-subtitle">
            Every treasure has a story. We help you find the ones worth keeping.
          </p>
        </div>

        {/* Founder Story */}
        <section className="founder-section">
          <div className="founder-content">
            <div className="founder-image">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                alt="Sam Weiner, Founder of Heirloom Atlas"
              />
            </div>

            <div className="founder-story">
              <h2 className="section-title brand">Meet Sam Weiner, Founder</h2>
              <div className="founder-bio">
                <p>
                  Sam Weiner's love affair with antiques began in his grandmother's attic at age eight,
                  where he discovered a dusty Victorian music box that still played a hauntingly beautiful melody.
                  That moment sparked a lifelong passion for objects that carry the weight of history and the
                  warmth of human touch.
                </p>

                <p>
                  After studying Art History at Boston University and apprenticing under master appraiser
                  Margaret Chen in Cambridge, Sam spent over fifteen years navigating the intricate world of
                  estate sales, auctions, and antique markets. He developed an eye for recognizing not just
                  valuable pieces, but items with soul—objects that tell stories of the families who cherished them.
                </p>

                <p>
                  "I've seen grown men weep over their father's woodworking tools and watched families find
                  closure through the careful placement of their mother's china collection," Sam reflects.
                  "Estate sales aren't just transactions; they're deeply human moments where one family's
                  treasures become another's new memories."
                </p>

                <p>
                  Sam's expertise extends beyond identification and valuation. He specializes in understanding
                  the provenance and emotional significance of pieces—from Georgian silver tea services to
                  mid-century modern furniture, from vintage costume jewelry to rare first edition books.
                  His approach combines scholarly knowledge with intuitive understanding of what makes an
                  object truly special.
                </p>

                <p>
                  The idea for Heirloom Atlas came during a particularly poignant estate sale in Salem, where
                  Sam watched a young couple carefully select items that would start their own family traditions.
                  He realized that while technology had transformed how we find almost everything else,
                  discovering meaningful estate sales still relied on word-of-mouth and classified ads.
                </p>

                <blockquote className="founder-quote">
                  "Every antique is a time capsule, holding within it the essence of the era it represents
                  and the lives it has touched. Technology should help these stories find their next chapter,
                  not replace the magic of discovery."
                  <cite>— Sam Weiner</cite>
                </blockquote>

                <p>
                  Today, Sam continues to attend estate sales personally, both to source exceptional pieces
                  for his private collection and to maintain his connection to the community that shaped him.
                  His expertise in American furniture, European ceramics, and 20th-century design informs
                  every aspect of Heirloom Atlas's approach to categorization and search functionality.
                </p>

                <p>
                  When he's not building Heirloom Atlas or exploring estate sales, Sam can be found restoring
                  antique clocks in his workshop, volunteering at the local historical society, or sharing
                  his knowledge through lectures at antique appreciation societies throughout New England.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <h2 className="section-title brand">Our Mission</h2>
          <div className="mission-content">
            <p>
              Heirloom Atlas exists to bridge the gap between treasure hunters and the stories waiting
              to be discovered. We believe that in our fast-paced digital world, there's profound value
              in objects that were crafted to last, loved by previous owners, and carry the patina of
              authentic human experience.
            </p>

            <div className="mission-values">
              <div className="value-item">
                <Heart className="value-icon" size={32} />
                <h3>Preserve Stories</h3>
                <p>Every piece has a history worth honoring and continuing.</p>
              </div>

              <div className="value-item">
                <MapPin className="value-icon" size={32} />
                <h3>Connect Communities</h3>
                <p>Bringing together collectors, families, and treasure hunters.</p>
              </div>

              <div className="value-item">
                <Star className="value-icon" size={32} />
                <h3>Celebrate Craftsmanship</h3>
                <p>Highlighting the artistry and quality of bygone eras.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works-about">
          <h2 className="section-title brand">How Heirloom Atlas Works</h2>
          <div className="about-content">
            <p>
              Our platform makes discovering estate sales as simple as finding a restaurant.
              Use our interactive map to search your area, filter by date, distance, type,
              and categories to find sales that match your interests.
            </p>

            <p>
              Save sales to your personal collection, get directions, add events to your calendar,
              and never miss an opportunity to find your next treasure. Whether you're hunting for
              mid-century modern furniture, vintage jewelry, antique tools, or fine art,
              Heirloom Atlas helps you discover the stories worth keeping.
            </p>
          </div>
        </section>

        {/* Data Sources */}
        <section className="data-sources">
          <h2 className="section-title brand">Data Sources & Ethics</h2>
          <div className="about-content">
            <p>
              Estate sale data is provided by EstateSales.NET and other official sources.
              We maintain strict ethical standards, respecting all data provider terms of service
              and attribution requirements. Our platform serves as a bridge to help you discover
              sales while always directing you to the original organizers for transactions.
            </p>

            <p>
              We believe in transparency, fair dealing, and supporting the estate sale community
              that makes this treasure hunting possible.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Treasure Hunt?</h2>
            <p>
              Join thousands of collectors who trust Heirloom Atlas to guide them to
              the stories worth keeping.
            </p>
            <Link to="/map" className="btn btn-primary btn-large">
              <MapPin size={20} />
              Explore Estate Sales
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
