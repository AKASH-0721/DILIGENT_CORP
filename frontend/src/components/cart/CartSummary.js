import React from 'react';
import { useCart } from '../../context/CartContext';
import { apiUtils } from '../../services/api';
import './CartSummary.css';

const CartSummary = ({ showCheckout = true, className = '' }) => {
  const { items, totalAmount, totalItems, clearCart } = useCart();

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  const handleCheckout = () => {
    // In a real app, this would integrate with a payment processor
    alert('Checkout functionality would be implemented here with a payment gateway like Stripe or PayPal.');
  };

  if (items.length === 0) {
    return null;
  }

  const subtotal = totalAmount;
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className={`cart-summary ${className}`}>
      <div className="summary-header">
        <h3>Order Summary</h3>
        <button 
          onClick={handleClearCart}
          className="clear-cart-btn"
          title="Clear cart"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6"/>
          </svg>
          Clear Cart
        </button>
      </div>

      <div className="summary-content">
        <div className="summary-item">
          <span>Items ({totalItems})</span>
          <span>{apiUtils.formatPrice(subtotal)}</span>
        </div>

        <div className="summary-item">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="free-shipping">FREE</span>
            ) : (
              apiUtils.formatPrice(shipping)
            )}
          </span>
        </div>

        <div className="summary-item">
          <span>Tax</span>
          <span>{apiUtils.formatPrice(tax)}</span>
        </div>

        {subtotal < 50 && (
          <div className="shipping-notice">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            Add {apiUtils.formatPrice(50 - subtotal)} more for free shipping!
          </div>
        )}

        <div className="summary-divider"></div>

        <div className="summary-total">
          <span>Total</span>
          <span>{apiUtils.formatPrice(total)}</span>
        </div>

        {showCheckout && (
          <div className="checkout-section">
            <button 
              onClick={handleCheckout}
              className="checkout-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
              </svg>
              Proceed to Checkout
            </button>
            
            <div className="payment-methods">
              <span>We accept:</span>
              <div className="payment-icons">
                <div className="payment-icon">💳</div>
                <div className="payment-icon">🏦</div>
                <div className="payment-icon">📱</div>
              </div>
            </div>
          </div>
        )}

        <div className="security-notice">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Secure checkout protected by SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;