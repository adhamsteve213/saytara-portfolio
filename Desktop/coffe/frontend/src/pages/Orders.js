import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrders();
      setOrders(response.data);
    } catch (err) {
      // If API fails, use mock data
      setOrders(getMockOrders());
    } finally {
      setLoading(false);
    }
  };

  const getMockOrders = () => {
    return [
      {
        id: 1,
        orderNumber: '123456',
        date: '2025-12-08',
        status: 'Delivered',
        total: 28.79,
        items: [
          { id: 1, name: 'Espresso', quantity: 2, price: 2.99, image: '☕' },
          { id: 2, name: 'Cappuccino', quantity: 1, price: 3.99, image: '☕' },
        ],
      },
      {
        id: 2,
        orderNumber: '123457',
        date: '2025-12-06',
        status: 'In Transit',
        total: 35.44,
        items: [
          { id: 3, name: 'Latte', quantity: 3, price: 4.49, image: '☕' },
          { id: 5, name: 'Iced Coffee', quantity: 2, price: 3.99, image: '🧊' },
        ],
      },
      {
        id: 3,
        orderNumber: '123458',
        date: '2025-12-05',
        status: 'Processing',
        total: 19.46,
        items: [
          { id: 4, name: 'Americano', quantity: 2, price: 3.49, image: '☕' },
        ],
      },
    ];
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">☕</div>
        <p className="ml-4 text-xl text-coffee-700">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-coffee-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-12 text-center animate-fade-in">
            <div className="text-8xl mb-6">📦</div>
            <h2 className="text-3xl font-bold text-coffee-800 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders. Start shopping to see your orders here.
            </p>
            <a
              href="/products"
              className="bg-coffee-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-coffee-700 transition inline-block"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-coffee-800 mb-8 animate-fade-in">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-slide-up hover:shadow-lg transition"
            >
              {/* Order Header */}
              <div className="bg-coffee-100 p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="text-xl font-bold text-coffee-800">
                      #{order.orderNumber}
                    </p>
                  </div>
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold text-coffee-800">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold text-coffee-600">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="font-bold text-coffee-800 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 pb-4 border-b last:border-b-0"
                    >
                      <div className="text-4xl bg-gradient-to-br from-coffee-100 to-coffee-200 p-3 rounded-lg">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-coffee-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-coffee-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions */}
              <div className="bg-gray-50 p-6 flex flex-col md:flex-row gap-4">
                <button className="flex-1 bg-coffee-600 text-white py-2 px-4 rounded hover:bg-coffee-700 transition">
                  Track Order
                </button>
                <button className="flex-1 border border-coffee-600 text-coffee-600 py-2 px-4 rounded hover:bg-coffee-50 transition">
                  Order Again
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
