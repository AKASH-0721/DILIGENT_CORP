import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import './Cart.css';

const Cart = () => {
  const { items, loading, error, clearError } = useCart();

  if (error) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="error-container">
            <div className="error-message">
              <h2>Unable to Load Cart</h2>
              <p>{error}</p>
              <button onClick={clearError} className="btn btn-primary">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
          </div>
          
          <div className="empty-cart">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="m1 1 4 4 5.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <h2>Your cart is empty</h2>
              <p>
                Looks like you haven't added any items to your cart yet. 
                Start shopping to fill it up with amazing products!
              </p>
              <div className="empty-cart-actions">
                <Link to="/products" className="btn btn-primary btn-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.3 5.1 16.3H17M17 13V17C17 18.1 17.9 19 19 19S21 18.1 21 17V13M9 19C10.1 19 11 20.1 11 21S10.1 23 9 23 7 21.9 7 21 7.9 19 9 19ZM20 19C21.1 19 22 20.1 22 21S21.1 23 20 23 18 21.9 18 21 18.9 19 20 19Z"/>
                  </svg>
                  Start Shopping
                </Link>
                <Link to="/" className="btn btn-secondary btn-lg">
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <div className="cart-breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Cart</span>
          </div>
        </div>

        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Items in Your Cart ({items.length})</h2>
            </div>

            {loading && (
              <div className="cart-loading">
                <div className="spinner"></div>
                <span>Loading cart...</span>
              </div>
            )}

            <div className="cart-items">
              {items.map(item => (
                <CartItem 
                  key={item.productId._id} 
                  item={item} 
                />
              ))}
            </div>

            <div className="continue-shopping">
              <Link to="/products" className="continue-shopping-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="cart-summary-section">
            <CartSummary />
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="recommended-section">
          <h3>You might also like</h3>
          <div className="recommended-notice">
            <p>Recommended products would appear here in a full implementation.</p>
            <Link to="/products" className="btn btn-secondary">
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;