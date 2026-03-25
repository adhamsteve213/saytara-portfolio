import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-coffee-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-coffee-600 to-coffee-800 text-white py-20 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-coffee-100">
            We'd love to hear from you
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold text-coffee-800 mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 animate-fade-in">
                Thank you! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-coffee-600 text-white py-3 rounded-lg font-semibold hover:bg-coffee-700 transition transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold text-coffee-800 mb-6">Get in Touch</h2>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-coffee-600 text-3xl">📍</div>
                  <div>
                    <h3 className="font-bold text-coffee-800 mb-1">Visit Us</h3>
                    <p className="text-gray-600">
                      123 Coffee Street<br />
                      Bean City, BC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-coffee-600 text-3xl">📞</div>
                  <div>
                    <h3 className="font-bold text-coffee-800 mb-1">Call Us</h3>
                    <p className="text-gray-600">
                      +1 (234) 567-890<br />
                      Mon-Fri: 9am - 6pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-coffee-600 text-3xl">✉️</div>
                  <div>
                    <h3 className="font-bold text-coffee-800 mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      info@coffeeshop.com<br />
                      support@coffeeshop.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-coffee-600 text-3xl">🕐</div>
                  <div>
                    <h3 className="font-bold text-coffee-800 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 7am - 8pm<br />
                      Saturday: 8am - 9pm<br />
                      Sunday: 9am - 6pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="font-bold text-coffee-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-coffee-600 text-white rounded-full flex items-center justify-center hover:bg-coffee-700 transition transform hover:scale-110"
                >
                  F
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-coffee-600 text-white rounded-full flex items-center justify-center hover:bg-coffee-700 transition transform hover:scale-110"
                >
                  T
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-coffee-600 text-white rounded-full flex items-center justify-center hover:bg-coffee-700 transition transform hover:scale-110"
                >
                  I
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-coffee-600 text-white rounded-full flex items-center justify-center hover:bg-coffee-700 transition transform hover:scale-110"
                >
                  L
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
