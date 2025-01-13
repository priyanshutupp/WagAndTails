import { useState } from 'react';
import { FiCreditCard, FiSmartphone, FiTruck } from 'react-icons/fi';

const PaymentMethodSelector = ({ onSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <FiCreditCard className="text-2xl" />,
      description: 'Pay securely with your credit or debit card'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: <FiSmartphone className="text-2xl" />,
      description: 'Pay using any UPI app (Google Pay, PhonePe, etc.)'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <FiTruck className="text-2xl" />,
      description: 'Pay when you receive your order'
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    onSelect(methodId);
  };

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`p-4 rounded-lg cursor-pointer transition-all ${
            selectedMethod === method.id
              ? 'bg-secondary bg-opacity-20 border-2 border-secondary'
              : 'bg-black-gradient-2 hover:bg-opacity-80'
          }`}
          onClick={() => handleMethodSelect(method.id)}
        >
          <div className="flex items-center gap-4">
            <div className={`${
              selectedMethod === method.id ? 'text-secondary' : 'text-white'
            }`}>
              {method.icon}
            </div>
            <div className="flex-1">
              <h3 className={`font-medium ${
                selectedMethod === method.id ? 'text-secondary' : 'text-white'
              }`}>
                {method.name}
              </h3>
              <p className="text-dimWhite text-sm">{method.description}</p>
            </div>
            <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${selectedMethod === method.id ? 'border-secondary' : 'border-white'}">
              {selectedMethod === method.id && (
                <div className="w-3 h-3 rounded-full bg-secondary" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodSelector; 