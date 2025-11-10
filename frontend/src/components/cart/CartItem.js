import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { apiUtils } from '../../services/api';
import './CartItem.css';

const CartItem = ({ item }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { updateCartItem, removeFromCart } = useCart();

  const { productId: product, quantity, price } = item;

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10 || newQuantity === quantity) {
      return;
    }

    setIsUpdating(true);
    await updateCartItem(product._id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await removeFromCart(product._id);
  };

  const totalPrice = price * quantity;

  return (
    <div className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      <div className="cart-item-image">
        <Link to={`/products/${product._id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="item-image"
          />
        </Link>
      </div>

      <div className="cart-item-details">
        <div className="item-header">
          <Link to={`/products/${product._id}`} className="item-name">
            {product.name}
          </Link>
          <button 
            onClick={handleRemove}
            disabled={isRemoving}
            className="remove-btn"
            aria-label="Remove item"
          >
            {isRemoving ? (
              <div className="btn-spinner"></div>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            )}
          </button>
        </div>

        <p className="item-description">{product.description}</p>
        
        <div className="item-category">
          <span className="category-badge">{product.category}</span>
        </div>

        <div className="item-footer">
          <div className="quantity-controls">
            <label htmlFor={`quantity-${product._id}`} className="quantity-label">
              Quantity:
            </label>
            <div className="quantity-input-group">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={isUpdating || quantity <= 1}
                className="quantity-btn"
                aria-label="Decrease quantity"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                </svg>
              </button>
              
              <input
                id={`quantity-${product._id}`}
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  if (!isNaN(newValue)) {
                    handleQuantityChange(newValue);
                  }
                }}
                disabled={isUpdating}
                className="quantity-input"
              />
              
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isUpdating || quantity >= 10 || quantity >= product.stock}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="item-pricing">
            <div className="unit-price">
              {apiUtils.formatPrice(price)} each
            </div>
            <div className="total-price">
              {apiUtils.formatPrice(totalPrice)}
            </div>
          </div>
        </div>

        {isUpdating && (
          <div className="updating-overlay">
            <div className="spinner-small"></div>
            Updating...
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;