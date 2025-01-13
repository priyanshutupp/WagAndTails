import { useState } from 'react';
import { FiSmartphone } from 'react-icons/fi';
import toast from 'react-hot-toast';

const UPIPayment = ({ amount, onSuccess }) => {
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!upiId) {
      setError('Please enter a valid UPI ID');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Here you would typically:
      // 1. Send the UPI ID to your backend
      // 2. Generate a UPI payment link/intent
      // 3. Handle the payment confirmation
      
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('UPI Payment successful!');
      onSuccess({
        id: 'upi_' + Date.now(),
        method: 'upi',
        upiId
      });
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      toast.error(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="text-white block mb-2">UPI ID</label>
        <div className="relative">
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="username@upi"
            className="w-full px-4 py-3 pl-12 bg-black-gradient-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
          <FiSmartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dimWhite text-xl" />
        </div>
        <p className="text-dimWhite text-sm mt-2">
          Enter your UPI ID (e.g., username@upi)
        </p>
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-3 px-6 bg-green-gradient text-primary rounded-lg font-medium 
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} 
          transition-opacity flex items-center justify-center gap-2`}
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>Pay ₹{amount.toFixed(2)} with UPI</>
        )}
      </button>
    </form>
  );
};

export default UPIPayment; 