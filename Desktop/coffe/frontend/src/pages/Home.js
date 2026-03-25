import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredProducts = [
    { id: 1, name: 'Espresso', price: 2.99, image: '☕' },
    { id: 2, name: 'Cappuccino', price: 3.99, image: '☕' },
    { id: 3, name: 'Latte', price: 4.49, image: '☕' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-coffee-600 to-coffee-800 text-white py-20 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            Welcome to Coffee Shop
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-coffee-100 animate-slide-up">
            Discover the perfect brew for every moment
          </p>
          <Link
            to="/products"
            className="bg-white text-coffee-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-coffee-100 transition transform hover:scale-105 inline-block animate-bounce-slow"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-coffee-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition transform hover:-translate-y-2 animate-slide-up">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-2xl font-bold mb-2 text-coffee-700">Premium Quality</h3>
              <p className="text-gray-600">
                We source the finest coffee beans from around the world
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition transform hover:-translate-y-2 animate-slide-up">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-bold mb-2 text-coffee-700">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your coffee delivered fresh to your doorstep
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition transform hover:-translate-y-2 animate-slide-up">
              <div className="text-6xl mb-4">💯</div>
              <h3 className="text-2xl font-bold mb-2 text-coffee-700">100% Satisfaction</h3>
              <p className="text-gray-600">
                We guarantee quality and taste in every cup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-coffee-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-coffee-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 animate-fade-in"
              >
                <div className="text-9xl text-center py-8 bg-gradient-to-br from-coffee-100 to-coffee-200">
                  {product.image}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-coffee-800">
                    {product.name}
                  </h3>
                  <p className="text-3xl font-bold text-coffee-600 mb-4">
                    ${product.price}
                  </p>
                  <Link
                    to={`/products/${product.id}`}
                    className="block w-full bg-coffee-600 text-white text-center py-2 rounded hover:bg-coffee-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-coffee-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-coffee-700 transition inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-coffee-700 to-coffee-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Great Coffee?</h2>
          <p className="text-xl mb-8 text-coffee-100">
            Join thousands of satisfied customers and elevate your coffee experience
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-coffee-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-coffee-100 transition transform hover:scale-105"
            >
              Sign Up Now
            </Link>
            <Link
              to="/contact"
              className="bg-coffee-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-coffee-600 transition transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
