import { FiX, FiMinus, FiPlus, FiShoppingBag, FiBookmark, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    savedItems,
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart,
    saveForLater,
    moveToCart,
    removeSavedItem
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md">
        <div className="flex h-full flex-col bg-black-gradient shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FiShoppingBag />
              Shopping Cart
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Cart Items */}
            <div className="p-4">
              <h3 className="text-white font-medium mb-4">Cart Items</h3>
              {cart.length === 0 ? (
                <p className="text-dimWhite">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 mb-4 bg-black-gradient-2 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-secondary font-bold">${item.price}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-white hover:text-secondary transition-colors"
                        >
                          <FiMinus />
                        </button>
                        <span className="text-white px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-white hover:text-secondary transition-colors"
                        >
                          <FiPlus />
                        </button>
                        <div className="ml-auto flex gap-2">
                          <button
                            onClick={() => saveForLater(item.id)}
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                          >
                            <FiBookmark size={16} />
                            Save
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-400 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Saved Items */}
            {savedItems.length > 0 && (
              <div className="p-4 border-t border-gray-600">
                <h3 className="text-white font-medium mb-4">Saved for Later</h3>
                {savedItems.map((item) => (
                  <div key={item.id} className="flex gap-4 mb-4 bg-black-gradient-2 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-secondary font-bold">${item.price}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => moveToCart(item.id)}
                          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        >
                          <FiShoppingCart size={16} />
                          Move to Cart
                        </button>
                        <button
                          onClick={() => removeSavedItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-600 p-4">
              <div className="flex justify-between mb-4">
                <span className="text-white">Total</span>
                <span className="text-secondary font-bold">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 py-2 px-4 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 py-2 px-4 bg-green-gradient text-primary rounded-lg hover:opacity-90 transition-opacity"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 