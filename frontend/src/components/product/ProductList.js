import React from 'react';
import ProductCard from './ProductCard';
import Loading from '../common/Loading';
import './ProductList.css';

const ProductList = ({ 
  products, 
  loading, 
  error, 
  title = 'Products',
  emptyMessage = 'No products found',
  showFilters = false,
  onFilterChange,
  filters = {}
}) => {
  
  if (loading) {
    return <Loading size="large" text="Loading products..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-message">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="m1 1 4 4 5.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <h3>{emptyMessage}</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* Filters Section */}
      {showFilters && (
        <div className="filters-section">
          <div className="filters-header">
            <h3>Filter Products</h3>
          </div>
          
          <div className="filters-grid">
            {/* Sort Filter */}
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select 
                className="filter-select"
                value={filters.sort || ''}
                onChange={(e) => onFilterChange('sort', e.target.value)}
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A-Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Min"
                  className="price-input"
                  value={filters.minPrice || ''}
                  onChange={(e) => onFilterChange('minPrice', e.target.value)}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="price-input"
                  value={filters.maxPrice || ''}
                  onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Clear Filters */}
            <div className="filter-group">
              <button 
                className="clear-filters-btn"
                onClick={() => onFilterChange('clear')}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Header */}
      <div className="products-header">
        <h2 className="products-title">{title}</h2>
        <span className="products-count">
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product._id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;