import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-coffee-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-coffee-600 to-coffee-800 text-white py-20 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl text-coffee-100">
            Crafting perfect coffee experiences since 2020
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-slide-up">
            <h2 className="text-4xl font-bold text-coffee-800 mb-6 text-center">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              Coffee Shop began with a simple passion: to bring the world's finest coffee to your cup. 
              Founded in 2020, we started as a small local café with big dreams and an unwavering 
              commitment to quality.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Today, we source our beans from sustainable farms across the globe, working directly with 
              farmers to ensure fair trade practices and exceptional quality. Every cup we serve tells a 
              story of dedication, craftsmanship, and love for the perfect brew.
            </p>
            <p className="text-lg text-gray-700">
              Our mission is simple: to make great coffee accessible to everyone, whether you're a 
              casual sipper or a devoted coffee enthusiast.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-coffee-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-coffee-800 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2 animate-slide-up">
              <div className="text-5xl mb-4 text-center">🌱</div>
              <h3 className="text-2xl font-bold text-coffee-800 mb-3 text-center">Sustainability</h3>
              <p className="text-gray-600 text-center">
                We're committed to environmental responsibility and supporting sustainable farming practices.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2 animate-slide-up">
              <div className="text-5xl mb-4 text-center">⭐</div>
              <h3 className="text-2xl font-bold text-coffee-800 mb-3 text-center">Quality</h3>
              <p className="text-gray-600 text-center">
                Every bean is carefully selected and roasted to perfection to deliver exceptional taste.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2 animate-slide-up">
              <div className="text-5xl mb-4 text-center">❤️</div>
              <h3 className="text-2xl font-bold text-coffee-800 mb-3 text-center">Community</h3>
              <p className="text-gray-600 text-center">
                We believe in building strong relationships with our customers and coffee-growing communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-coffee-800 mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO', emoji: '👩‍💼' },
              { name: 'Mike Chen', role: 'Head Barista', emoji: '👨‍🍳' },
              { name: 'Emma Davis', role: 'Coffee Buyer', emoji: '👩‍💻' },
              { name: 'Alex Rodriguez', role: 'Operations Manager', emoji: '👨‍💼' },
            ].map((member, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-coffee-50 transition animate-fade-in"
              >
                <div className="text-7xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold text-coffee-800 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-coffee-700 to-coffee-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Coffee Journey</h2>
          <p className="text-xl mb-8 text-coffee-100">
            Experience the difference that passion and quality make
          </p>
          <a
            href="/products"
            className="bg-white text-coffee-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-coffee-100 transition inline-block transform hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
