# Coffee Shop Frontend

A modern, responsive React frontend for a coffee shop e-commerce platform with Tailwind CSS animations and Spring Boot backend integration.

## Features

### 🎨 Pages & Components

- **Home Page**: Animated hero section with featured products
- **Products Page**: Grid layout with category filtering
- **Product Details**: Detailed product view with quantity selector
- **Shopping Cart**: Add, update, and remove items
- **Checkout**: Complete order form with payment details
- **Orders**: View order history and track orders
- **Authentication**: Login and Signup pages
- **About**: Company information and values
- **Contact**: Contact form and business information

### ✨ Key Features

- ☕ **Shopping Cart**: Persistent cart with localStorage
- 🔐 **Authentication**: Login/Signup with JWT token management
- 🛒 **Checkout Process**: Complete order flow
- 📦 **Order Management**: View and track orders
- 🎭 **Animations**: Smooth Tailwind CSS animations
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **Custom Theme**: Coffee-inspired color palette

## Tech Stack

- **React 19**: Latest React with functional components
- **React Router DOM**: Client-side routing
- **Tailwind CSS 3.3**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Context API**: State management for auth and cart

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation bar with cart badge
│   └── Footer.js          # Footer with links and contact info
├── context/
│   ├── AuthContext.js     # Authentication state management
│   └── CartContext.js     # Shopping cart state management
├── pages/
│   ├── Home.js            # Landing page
│   ├── Products.js        # Products listing
│   ├── ProductDetails.js  # Single product view
│   ├── Cart.js            # Shopping cart
│   ├── Checkout.js        # Checkout form
│   ├── OrderSuccess.js    # Order confirmation
│   ├── Orders.js          # Order history
│   ├── Login.js           # Login form
│   ├── Signup.js          # Registration form
│   ├── About.js           # About page
│   └── Contact.js         # Contact page
├── services/
│   └── api.js             # API service layer
├── App.js                 # Main app component with routing
└── index.js               # Entry point

```

## Backend Integration

The frontend connects to a Spring Boot backend running on `http://localhost:8080/api`

### API Endpoints Expected

#### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

#### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

#### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart

#### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spring Boot backend running on port 8080

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

The app will open at `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Configuration

### API Base URL

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost:8080/api";
```

### Tailwind Configuration

Custom colors and animations are defined in `tailwind.config.js`:

- Coffee color palette (50-900 shades)
- Custom animations (fade-in, slide-up, slide-down, bounce-slow)

## State Management

### Auth Context

- Manages user authentication state
- Stores JWT token in localStorage
- Provides login, signup, and logout functions

### Cart Context

- Manages shopping cart state
- Persists cart to localStorage
- Provides cart operations (add, remove, update, clear)

## Styling

The app uses Tailwind CSS with:

- Custom coffee-themed color palette
- Responsive utility classes
- Custom animations and transitions
- Mobile-first design approach

## Mock Data

If the backend is not available, the app uses mock data for:

- Products listing
- Order history
- User authentication (client-side only)

## Features Demo

### Navigation

- Sticky navigation bar
- Cart item count badge
- Responsive mobile menu
- User authentication state

### Product Browsing

- Category filtering (All, Hot, Cold)
- Product cards with hover effects
- Add to cart with feedback
- Product details modal

### Shopping Cart

- Update quantities
- Remove items
- Calculate totals with tax and shipping
- Persistent across sessions

### Checkout

- Shipping information form
- Payment details form
- Order summary
- Success confirmation page

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please visit the Contact page or email info@coffeeshop.com

---

Built with ❤️ and ☕ using React and Tailwind CSS
