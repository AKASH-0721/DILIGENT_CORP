import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import Loading from '../components/common/Loading';
import { productAPI, apiUtils } from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [featured, categoriesData] = await Promise.all([
        productAPI.getFeaturedProducts(),
        productAPI.getCategories()
      ]);

      setFeaturedProducts(featured);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching home data:', error);
      setError(apiUtils.handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="large" text="Loading..." />;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Welcome to <span className="brand-highlight">ShopEase</span>
              </h1>
              <p className="hero-description">
                Discover amazing products at unbeatable prices. From electronics to fashion, 
                find everything you need in one place with fast shipping and excellent customer service.
              </p>
              <div className="hero-actions">
                <Link to="/products" className="btn btn-primary btn-lg">
                  Shop Now
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link to="/category/Electronics" className="btn btn-secondary btn-lg">
                  Browse Electronics
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
                alt="Shopping Experience"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Secure Shopping</h3>
              <p>Your personal and payment information is always protected with industry-standard encryption.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered quickly with our reliable shipping partners. Free shipping on orders over $50!</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                </svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Our customer service team is here to help you with any questions or concerns around the clock.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Explore our wide range of product categories</p>
          </div>
          
          <div className="categories-grid">
            {categories.map(category => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="category-card"
              >
                <div className="category-content">
                  <h3 className="category-name">{category}</h3>
                  <div className="category-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Handpicked products that our customers love</p>
          </div>
          
          {error ? (
            <div className="error-container">
              <div className="error-message">
                <h3>Unable to load featured products</h3>
                <p>{error}</p>
                <button 
                  onClick={fetchHomeData}
                  className="btn btn-primary"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <ProductList 
              products={featuredProducts}
              loading={false}
              error={null}
              title=""
              emptyMessage="No featured products available"
              showFilters={false}
            />
          )}

          <div className="section-footer">
            <Link to="/products" className="btn btn-secondary">
              View All Products
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Stay in the Loop</h2>
              <p>
                Subscribe to our newsletter and be the first to know about new arrivals, 
                exclusive deals, and special offers.
              </p>
            </div>
            <form className="newsletter-form">
              <input 
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;