import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      // If API fails, use mock data
      setProducts(getMockProducts());
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const getMockProducts = () => {
    return [
      {
        id: 1,
        name: 'Espresso',
        price: 2.99,
        description: 'Strong and bold coffee shot',
        category: 'hot',
        image: '☕',
      },
      {
        id: 2,
        name: 'Cappuccino',
        price: 3.99,
        description: 'Espresso with steamed milk foam',
        category: 'hot',
        image: '☕',
      },
      {
        id: 3,
        name: 'Latte',
        price: 4.49,
        description: 'Smooth espresso with steamed milk',
        category: 'hot',
        image: '☕',
      },
      {
        id: 4,
        name: 'Americano',
        price: 3.49,
        description: 'Espresso with hot water',
        category: 'hot',
        image: '☕',
      },
      {
        id: 5,
        name: 'Iced Coffee',
        price: 3.99,
        description: 'Cold brewed perfection',
        category: 'cold',
        image: '🧊',
      },
      {
        id: 6,
        name: 'Frappuccino',
        price: 5.49,
        description: 'Blended coffee drink',
        category: 'cold',
        image: '🧊',
      },
      {
        id: 7,
        name: 'Mocha',
        price: 4.99,
        description: 'Chocolate and espresso blend',
        category: 'hot',
        image: '☕',
      },
      {
        id: 8,
        name: 'Macchiato',
        price: 3.49,
        description: 'Espresso with foam mark',
        category: 'hot',
        image: '☕',
      },
    ];
  };

  const categories = ['all', 'hot', 'cold'];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">☕</div>
        <p className="ml-4 text-xl text-coffee-700">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-coffee-800 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600">
            Discover our handcrafted coffee selection
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 space-x-4 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-coffee-600 text-white'
                  : 'bg-white text-coffee-600 hover:bg-coffee-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 animate-fade-in"
            >
              <Link to={`/products/${product.id}`}>
                <div className="text-8xl text-center py-8 bg-gradient-to-br from-coffee-100 to-coffee-200 hover:from-coffee-200 hover:to-coffee-300 transition">
                  {product.image}
                </div>
              </Link>
              <div className="p-6">
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-xl font-bold mb-2 text-coffee-800 hover:text-coffee-600 transition">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-coffee-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-4 py-2 rounded transition ${
                      addedToCart === product.id
                        ? 'bg-green-500 text-white'
                        : 'bg-coffee-600 text-white hover:bg-coffee-700'
                    }`}
                  >
                    {addedToCart === product.id ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
