import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../config/stripe';
import PaymentForm from '../components/PaymentForm';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import UPIPayment from '../components/UPIPayment';
import CashOnDelivery from '../components/CashOnDelivery';
import styles from '../style';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    // Shipping Information
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateShippingInfo = () => {
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const missing = required.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      toast.error(`Please fill in all required fields`);
      return false;
    }
    return true;
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      // Here you would typically:
      // 1. Send the order details to your backend
      // 2. Create the order in your database
      // 3. Send confirmation email
      // For now, we'll just clear the cart and redirect
      clearCart();
      navigate('/order-success');
    } catch (error) {
      toast.error('Error processing order. Please try again.');
    }
  };

  const nextStep = () => {
    if (step === 2 && !validateShippingInfo()) {
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <Elements stripe={stripePromise}>
            <PaymentForm 
              amount={getCartTotal()} 
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        );
      case 'upi':
        return (
          <UPIPayment
            amount={getCartTotal()}
            onSuccess={handlePaymentSuccess}
          />
        );
      case 'cod':
        return (
          <CashOnDelivery
            amount={getCartTotal()}
            onSuccess={handlePaymentSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className={`${styles.paddingX} py-20`}>
        <div className="container mx-auto max-w-4xl">
          {/* Checkout Steps */}
          <div className="flex justify-between mb-8">
            <div className={`flex-1 text-center ${step >= 1 ? 'text-secondary' : 'text-dimWhite'}`}>
              <div className="mb-2">1. Review Cart</div>
              <div className="h-1 bg-black-gradient rounded">
                <div className={`h-full bg-secondary rounded ${step >= 1 ? 'w-full' : 'w-0'} transition-all duration-300`} />
              </div>
            </div>
            <div className={`flex-1 text-center ${step >= 2 ? 'text-secondary' : 'text-dimWhite'}`}>
              <div className="mb-2">2. Shipping</div>
              <div className="h-1 bg-black-gradient rounded">
                <div className={`h-full bg-secondary rounded ${step >= 2 ? 'w-full' : 'w-0'} transition-all duration-300`} />
              </div>
            </div>
            <div className={`flex-1 text-center ${step >= 3 ? 'text-secondary' : 'text-dimWhite'}`}>
              <div className="mb-2">3. Payment</div>
              <div className="h-1 bg-black-gradient rounded">
                <div className={`h-full bg-secondary rounded ${step >= 3 ? 'w-full' : 'w-0'} transition-all duration-300`} />
              </div>
            </div>
          </div>

          <div className="bg-black-gradient rounded-xl p-8">
            {step === 1 && (
              /* Review Cart */
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Review Your Cart</h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-black-gradient-2 p-4 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <p className="text-secondary">${item.price}</p>
                        <p className="text-dimWhite">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-white font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-gray-600 pt-4">
                  <div className="flex justify-between text-white">
                    <span>Total</span>
                    <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              /* Shipping Information */
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-gradient-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-gradient-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-gradient-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary mt-1"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-white">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-gradient-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-gradient-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-gradient-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-gradient-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              /* Payment Information */
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Payment Information</h2>
                <div className="mb-8">
                  <PaymentMethodSelector onSelect={setPaymentMethod} />
                </div>
                {renderPaymentMethod()}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-2 text-white hover:text-secondary transition-colors"
                >
                  <FiChevronLeft />
                  Previous
                </button>
              )}
              {step < 3 && (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-2 bg-green-gradient text-primary rounded-lg hover:opacity-90 transition-opacity ml-auto"
                >
                  Next
                  <FiChevronRight />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 