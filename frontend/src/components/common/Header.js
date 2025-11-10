import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productAPI } from '../../services/api';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await productAPI.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <h2>ShopEase</h2>
          </Link>

          {/* Search Bar */}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3965 17.9998 12.4887 17.9998 10.4995C17.9998 8.51035 17.2096 6.60262 15.803 5.19605C14.3965 3.78947 12.4887 2.99927 10.4995 2.99927C8.51035 2.99927 6.60262 3.78947 5.19605 5.19605C3.78947 6.60262 2.99927 8.51035 2.99927 10.4995C2.99927 12.4887 3.78947 14.3965 5.19605 15.803C6.60262 17.2096 8.51035 17.9998 10.4995 17.9998C12.4887 17.9998 14.3965 17.2096 15.803 15.803Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link 
              to="/" 
              className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`nav-link ${isActiveLink('/products') ? 'active' : ''}`}
            >
              Products
            </Link>
            
            {/* Categories Dropdown */}
            <div className="dropdown">
              <button className="dropdown-toggle">
                Categories
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="dropdown-menu">
                {categories.map(category => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    className="dropdown-item"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="header-actions">
            {/* Cart Icon */}
            <Link to="/cart" className="cart-link">
              <div className="cart-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.3 5.1 16.3H17M17 13V17C17 18.1 17.9 19 19 19S21 18.1 21 17V13M9 19C10.1 19 11 20.1 11 21S10.1 23 9 23 7 21.9 7 21 7.9 19 9 19ZM20 19C21.1 19 22 20.1 22 21S21.1 23 20 23 18 21.9 18 21 18.9 19 20 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <Link 
              to="/" 
              className={`mobile-nav-link ${isActiveLink('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`mobile-nav-link ${isActiveLink('/products') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Products
            </Link>
            
            <div className="mobile-categories">
              <span className="mobile-categories-title">Categories</span>
              {categories.map(category => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="mobile-nav-link category-link"
                  onClick={closeMenu}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;