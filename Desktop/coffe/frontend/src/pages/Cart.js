import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-coffee-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-12 text-center animate-fade-in">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-coffee-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/products"
              className="bg-coffee-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-coffee-700 transition inline-block"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-coffee-800 mb-8 animate-fade-in">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 animate-slide-up hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-6">
                  {/* Product Image */}
                  <div className="text-6xl bg-gradient-to-br from-coffee-100 to-coffee-200 p-4 rounded-lg">
                    {item.image}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-xl font-bold text-coffee-800 hover:text-coffee-600 transition"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                    <p className="text-2xl font-bold text-coffee-600 mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-coffee-200 text-coffee-800 w-8 h-8 rounded-full hover:bg-coffee-300 transition"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-coffee-200 text-coffee-800 w-8 h-8 rounded-full hover:bg-coffee-300 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal and Remove */}
                  <div className="text-right">
                    <p className="text-xl font-bold text-coffee-800 mb-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 transition font-semibold"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 animate-fade-in">
              <h2 className="text-2xl font-bold text-coffee-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-coffee-800">
                    <span>Total</span>
                    <span>${(getCartTotal() + 5 + getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-coffee-600 text-white py-3 rounded-lg font-semibold hover:bg-coffee-700 transition transform hover:scale-105"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block w-full text-center text-coffee-600 mt-4 hover:text-coffee-800 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
