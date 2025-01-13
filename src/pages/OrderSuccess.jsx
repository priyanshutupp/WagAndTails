import { useNavigate } from 'react-router-dom';
import { FiCheck, FiShoppingBag } from 'react-icons/fi';
import styles from '../style';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary flex items-center">
      <div className={`${styles.paddingX} container mx-auto max-w-2xl text-center`}>
        <div className="bg-black-gradient rounded-xl p-8">
          <div className="w-16 h-16 bg-green-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-primary text-3xl" />
          </div>
          <h1 className="text-3xl font-semibold text-white mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-dimWhite mb-8">
            Thank you for your purchase. We'll send you an email with your order details and tracking information once your order ships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/products')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-gradient text-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              <FiShoppingBag />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 