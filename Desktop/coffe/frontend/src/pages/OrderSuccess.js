import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-coffee-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-2xl mx-auto animate-fade-in">
          <div className="text-green-500 text-8xl mb-6 animate-bounce">✓</div>
          <h1 className="text-4xl font-bold text-coffee-800 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your order. We've received it and will start preparing it right away.
          </p>
          
          <div className="bg-coffee-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-3xl font-bold text-coffee-700">#{orderNumber}</p>
          </div>

          <div className="space-y-4 text-left mb-8">
            <div className="flex items-start space-x-3">
              <div className="text-green-500 text-2xl">✓</div>
              <div>
                <p className="font-semibold text-coffee-800">Order Confirmation</p>
                <p className="text-sm text-gray-600">
                  You'll receive a confirmation email shortly
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-500 text-2xl">✓</div>
              <div>
                <p className="font-semibold text-coffee-800">Estimated Delivery</p>
                <p className="text-sm text-gray-600">
                  Your order will arrive within 3-5 business days
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-500 text-2xl">✓</div>
              <div>
                <p className="font-semibold text-coffee-800">Track Your Order</p>
                <p className="text-sm text-gray-600">
                  Check your order status in My Orders
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/orders"
              className="bg-coffee-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-coffee-700 transition"
            >
              View My Orders
            </Link>
            <Link
              to="/products"
              className="bg-coffee-200 text-coffee-800 px-8 py-3 rounded-lg font-semibold hover:bg-coffee-300 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
