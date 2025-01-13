import { useState } from 'react';
import { FiTruck, FiAlertCircle } from 'react-icons/fi';

const CashOnDelivery = ({ amount, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!accepted) {
      return;
    }

    setIsProcessing(true);

    try {
      // Here you would typically:
      // 1. Send the order details to your backend
      // 2. Create a COD order
      // 3. Handle the order confirmation
      
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess({
        id: 'cod_' + Date.now(),
        method: 'cod'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 p-4 bg-black-gradient-2 rounded-lg">
        <div className="flex items-start gap-3">
          <FiAlertCircle className="text-secondary text-xl mt-1" />
          <div>
            <h4 className="text-white font-medium mb-2">Important Information</h4>
            <ul className="text-dimWhite text-sm space-y-2">
              <li>• Cash payment will be collected at the time of delivery</li>
              <li>• Please keep exact change ready</li>
              <li>• Our delivery partner will contact you before delivery</li>
              <li>• Additional charges may apply for multiple delivery attempts</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary"
          />
          <span className="text-white">
            I agree to pay ₹{amount.toFixed(2)} in cash at the time of delivery
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!accepted || isProcessing}
        className={`w-full py-3 px-6 bg-green-gradient text-primary rounded-lg font-medium 
          ${(!accepted || isProcessing) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} 
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
          <>
            <FiTruck className="text-xl" />
            Place Order with Cash on Delivery
          </>
        )}
      </button>
    </form>
  );
};

export default CashOnDelivery; 