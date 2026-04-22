import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { apiUtils } from '../../services/api';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart, getCartItemQuantity } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) return;
    console.log(product)
    
    setIsLoading(true);
    const result = await addToCart(product._id, 1);
    setIsLoading(false);
    
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const cartQuantity = getCartItemQuantity(product._id);
  const isOutOfStock = product.stock === 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <Link to={`/products/${product._id}`} className="product-card-link">
        {/* Product Image */}
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          {isOutOfStock && (
            <div className="out-of-stock-overlay">
              <span>Out of Stock</span>
            </div>
          )}
          {product.featured && (
            <div className="featured-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Featured
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
          {/* Rating */}
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(product.ratings.average) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="star"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="rating-text">
              {product.ratings.average.toFixed(1)} ({product.ratings.count})
            </span>
          </div>

          {/* Price and Stock */}
          <div className="product-price-section">
            <span className="product-price">
              {apiUtils.formatPrice(product.price)}
            </span>
            <span className="product-stock">
              {product.stock > 10 ? 'In Stock' : 
               product.stock > 0 ? `Only ${product.stock} left` : 
               'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="product-actions">
        <button 
          onClick={handleAddToCart}
          disabled={isOutOfStock || isLoading}
          className={`add-to-cart-btn ${showSuccess ? 'success' : ''}`}
        >
          {isLoading ? (
            <div className="btn-spinner"></div>
          ) : showSuccess ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17L4 12"/>
              </svg>
              Added!
            </>
          ) : cartQuantity > 0 ? (
            `In Cart (${cartQuantity})`
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;