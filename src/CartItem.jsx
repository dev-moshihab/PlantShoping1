// CartItem.jsx

import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleRemoveItem = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleQuantityChange = (itemName, newQuantity) => {
    dispatch(updateQuantity({ name: itemName, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // حساب المجموع الكلي
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="cart-container">
      <h2>سلة التسوق</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>سلة التسوق فارغة</p>
          <button onClick={onContinueShopping} className="continue-shopping-btn">
            متابعة التسوق
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="item-price">{item.cost}</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.name)}
                  className="remove-btn"
                >
                  إزالة
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="total">
              <h3>المجموع: ${total.toFixed(2)}</h3>
            </div>
            <div className="cart-actions">
              <button onClick={onContinueShopping} className="continue-shopping-btn">
                متابعة التسوق
              </button>
              <button onClick={handleClearCart} className="clear-cart-btn">
                تفريغ السلة
              </button>
              <button className="checkout-btn">
                الدفع
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;