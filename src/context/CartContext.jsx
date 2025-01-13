import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();

  // Load cart and saved items from localStorage when user logs in
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.uid}`);
      const savedForLater = localStorage.getItem(`saved_${user.uid}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      if (savedForLater) {
        setSavedItems(JSON.parse(savedForLater));
      }
    } else {
      setCart([]);
      setSavedItems([]);
    }
  }, [user]);

  // Save cart and saved items to localStorage whenever they change
  useEffect(() => {
    if (user) {
      if (cart.length > 0) {
        localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
      } else {
        localStorage.removeItem(`cart_${user.uid}`);
      }
      if (savedItems.length > 0) {
        localStorage.setItem(`saved_${user.uid}`, JSON.stringify(savedItems));
      } else {
        localStorage.removeItem(`saved_${user.uid}`);
      }
    }
  }, [cart, savedItems, user]);

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const addToCart = (product) => {
    if (!user) return false;

    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        toast.success('Item quantity updated in cart');
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success('Item added to cart');
      return [...currentCart, { ...product, quantity: 1 }];
    });
    return true;
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
    toast.success('Quantity updated');
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      localStorage.removeItem(`cart_${user.uid}`);
    }
    toast.success('Cart cleared');
  };

  const saveForLater = (productId) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      setSavedItems(current => [...current, item]);
      setCart(current => current.filter(item => item.id !== productId));
      toast.success('Item saved for later');
    }
  };

  const moveToCart = (productId) => {
    const item = savedItems.find(item => item.id === productId);
    if (item) {
      addToCart(item);
      setSavedItems(current => current.filter(item => item.id !== productId));
      toast.success('Item moved to cart');
    }
  };

  const removeSavedItem = (productId) => {
    setSavedItems(current => current.filter(item => item.id !== productId));
    toast.success('Saved item removed');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    savedItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    setIsCartOpen,
    saveForLater,
    moveToCart,
    removeSavedItem,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
} 