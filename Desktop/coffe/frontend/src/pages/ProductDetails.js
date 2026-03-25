import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (err) {
      // If API fails, use mock data
      setProduct(getMockProduct(parseInt(id)));
    } finally {
      setLoading(false);
    }
  };

  const getMockProduct = (productId) => {
    const products = {
      1: {
        id: 1,
        name: 'Espresso',
        price: 2.99,
        description: 'Strong and bold coffee shot made from premium arabica beans.',
        fullDescription: 'Our signature espresso is crafted from the finest arabica beans, roasted to perfection. This intense and aromatic shot delivers a rich, full-bodied flavor with notes of dark chocolate and caramel. Perfect for coffee purists who appreciate the true essence of coffee.',
        category: 'hot',
        image: '☕',
        inStock: true,
      },
      2: {
        id: 2,
        name: 'Cappuccino',
        price: 3.99,
        description: 'Espresso with steamed milk foam',
        fullDescription: 'A perfect balance of espresso, steamed milk, and velvety foam. Our cappuccino is topped with a delicate layer of microfoam that melts in your mouth, creating a harmonious blend of coffee and cream.',
        category: 'hot',
        image: '☕',
        inStock: true,
      },
      3: {
        id: 3,
        name: 'Latte',
        price: 4.49,
        description: 'Smooth espresso with steamed milk',
        fullDescription: 'A creamy and smooth coffee experience. Our latte combines rich espresso with perfectly steamed milk, creating a drink that is both comforting and energizing. Ideal for those who prefer a milder coffee flavor.',
        category: 'hot',
        image: '☕',
        inStock: true,
      },
    };
    return products[productId] || products[1];
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">☕</div>
        <p className="ml-4 text-xl text-coffee-700">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-coffee-600 text-white px-6 py-2 rounded hover:bg-coffee-700 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/products')}
          className="mb-6 flex items-center text-coffee-600 hover:text-coffee-800 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-coffee-100 to-coffee-200 flex items-center justify-center p-12">
              <div className="text-9xl animate-bounce-slow">{product.image}</div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-coffee-800 mb-4 animate-slide-up">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <span className="text-4xl font-bold text-coffee-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.inStock ? (
                  <span className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    In Stock
                  </span>
                ) : (
                  <span className="ml-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-6 text-lg">
                {product.fullDescription || product.description}
              </p>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-semibold mb-2 text-coffee-800">Category</h3>
                <span className="inline-block bg-coffee-100 text-coffee-800 px-4 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2 text-coffee-800">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-coffee-200 text-coffee-800 w-10 h-10 rounded-full hover:bg-coffee-300 transition"
                  >
                    -
                  </button>
                  <span className="text-2xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-coffee-200 text-coffee-800 w-10 h-10 rounded-full hover:bg-coffee-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : product.inStock
                      ? 'bg-coffee-600 text-white hover:bg-coffee-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    product.inStock
                      ? 'bg-coffee-800 text-white hover:bg-coffee-900'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
