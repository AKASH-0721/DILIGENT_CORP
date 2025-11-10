import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productAPI, apiUtils } from '../services/api';
import Loading from '../components/common/Loading';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { addToCart, getCartItemQuantity } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productData = await productAPI.getProductById(id);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(apiUtils.handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product || selectedQuantity < 1) return;
    
    setIsAddingToCart(true);
    const result = await addToCart(product._id, selectedQuantity);
    setIsAddingToCart(false);
    
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= Math.min(10, product.stock)) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    if (showSuccess) {
      navigate('/cart');
    }
  };

  if (loading) {
    return <Loading size="large" text="Loading product..." />;
  }

  if (error) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="error-container">
            <div className="error-message">
              <h2>Product Not Found</h2>
              <p>{error}</p>
              <div className="error-actions">
                <button onClick={fetchProduct} className="btn btn-primary">
                  Try Again
                </button>
                <Link to="/products" className="btn btn-secondary">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const cartQuantity = getCartItemQuantity(product._id);
  const isOutOfStock = product.stock === 0;
  const maxQuantity = Math.min(10, product.stock);

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/category/${product.category}`} className="breadcrumb-link">
            {product.category}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-details">
          {/* Product Image */}
          <div className="product-image-section">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
              />
              {product.featured && (
                <div className="featured-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Featured
                </div>
              )}
              {isOutOfStock && (
                <div className="out-of-stock-overlay">
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <div className="category-badge">
                <Link to={`/category/${product.category}`}>
                  {product.category}
                </Link>
              </div>
              
              <h1 className="product-title">{product.name}</h1>
              
              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
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
                  {product.ratings.average.toFixed(1)} ({product.ratings.count} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="price-section">
              <div className="current-price">
                {apiUtils.formatPrice(product.price)}
              </div>
            </div>

            {/* Description */}
            <div className="description-section">
              <h3>Description</h3>
              <p className="product-description">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="stock-section">
              <div className="stock-status">
                <span className={`stock-indicator ${isOutOfStock ? 'out-of-stock' : 'in-stock'}`}>
                  {isOutOfStock ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M15 9l-6 6M9 9l6 6"/>
                      </svg>
                      Out of Stock
                    </>
                  ) : product.stock <= 10 ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 9v3l2 2"/>
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                      Only {product.stock} left in stock
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17L4 12"/>
                      </svg>
                      In Stock
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Quantity and Actions */}
            {!isOutOfStock && (
              <div className="purchase-section">
                <div className="quantity-section">
                  <label htmlFor="quantity" className="quantity-label">
                    Quantity:
                  </label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(selectedQuantity - 1)}
                      disabled={selectedQuantity <= 1}
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14"/>
                      </svg>
                    </button>
                    
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max={maxQuantity}
                      value={selectedQuantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="quantity-input"
                    />
                    
                    <button 
                      onClick={() => handleQuantityChange(selectedQuantity + 1)}
                      disabled={selectedQuantity >= maxQuantity}
                      className="quantity-btn"
                      aria-label="Increase quantity"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`add-to-cart-btn ${showSuccess ? 'success' : ''}`}
                  >
                    {isAddingToCart ? (
                      <div className="btn-spinner"></div>
                    ) : showSuccess ? (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17L4 12"/>
                        </svg>
                        Added to Cart!
                      </>
                    ) : cartQuantity > 0 ? (
                      `Update Cart (${cartQuantity + selectedQuantity})`
                    ) : (
                      'Add to Cart'
                    )}
                  </button>

                  <button 
                    onClick={handleBuyNow}
                    disabled={isAddingToCart}
                    className="buy-now-btn"
                  >
                    Buy Now
                  </button>
                </div>

                {cartQuantity > 0 && (
                  <div className="cart-info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                    You already have {cartQuantity} of this item in your cart
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;