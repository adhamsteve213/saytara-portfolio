# Koffeshop Cafe Backend API

A complete Laravel backend API for a coffee shop/cafe system with product management, shopping cart, and order processing.

## Features

-   **Authentication**: User registration and login with Laravel Sanctum
-   **Categories**: Organize menu items into categories
-   **Products**: Complete menu management with prices, images, and availability
-   **Shopping Cart**: Add, update, and remove items from cart
-   **Orders**: Place orders, track status, and payment information
-   **Admin Panel**: Manage categories, products, and orders

## Database Setup

### Run Migrations

```bash
php artisan migrate
```

### Seed Database with Sample Data

```bash
php artisan db:seed
```

This will create:

-   2 test users (admin@koffeshop.com and test@example.com)
-   10 additional users
-   8 categories (Hot Coffee, Iced Coffee, Tea, Pastries, Sandwiches, Desserts, Cold Drinks, Breakfast)
-   16 sample products with realistic cafe items

## API Endpoints

### Authentication

#### Register

```
POST /api/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

#### Login

```
POST /api/login
Body: {
  "email": "test@example.com",
  "password": "password"
}
Response: {
  "success": true,
  "data": {
    "user": {...},
    "token": "your-auth-token"
  }
}
```

#### Logout

```
POST /api/logout
Headers: Authorization: Bearer {token}
```

#### Get Current User

```
GET /api/user
Headers: Authorization: Bearer {token}
```

### Categories (Public)

#### Get All Categories

```
GET /api/categories
```

#### Get Single Category

```
GET /api/categories/{id}
```

### Products (Public)

#### Get All Products

```
GET /api/products
Query Params:
  - category_id: Filter by category
  - is_available: Filter by availability (true/false)
  - is_featured: Filter featured products
  - search: Search by product name
```

#### Get Featured Products

```
GET /api/products/featured
```

#### Get Single Product

```
GET /api/products/{id}
```

### Shopping Cart (Protected)

#### Get Cart

```
GET /api/cart
Headers: Authorization: Bearer {token}
```

#### Add to Cart

```
POST /api/cart
Headers: Authorization: Bearer {token}
Body: {
  "product_id": 1,
  "quantity": 2
}
```

#### Update Cart Item

```
PUT /api/cart/{id}
Headers: Authorization: Bearer {token}
Body: {
  "quantity": 3
}
```

#### Remove from Cart

```
DELETE /api/cart/{id}
Headers: Authorization: Bearer {token}
```

#### Clear Cart

```
DELETE /api/cart
Headers: Authorization: Bearer {token}
```

### Orders (Protected)

#### Get User Orders

```
GET /api/orders
Headers: Authorization: Bearer {token}
```

#### Create Order from Cart

```
POST /api/orders
Headers: Authorization: Bearer {token}
Body: {
  "payment_method": "credit_card",
  "notes": "Please add extra sugar"
}
```

#### Get Single Order

```
GET /api/orders/{id}
Headers: Authorization: Bearer {token}
```

#### Cancel Order

```
PUT /api/orders/{id}/cancel
Headers: Authorization: Bearer {token}
```

### Admin Routes (Protected)

All admin routes require authentication and should be protected with an admin middleware.

#### Category Management

```
POST   /api/admin/categories
PUT    /api/admin/categories/{id}
DELETE /api/admin/categories/{id}
```

#### Product Management

```
POST   /api/admin/products
PUT    /api/admin/products/{id}
DELETE /api/admin/products/{id}
```

#### Order Management

```
GET /api/admin/orders              # Get all orders
PUT /api/admin/orders/{id}/status  # Update order status
Body: {
  "status": "processing",          # pending, processing, completed, cancelled
  "payment_status": "paid"         # unpaid, paid, refunded
}
```

## Database Schema

### Categories

-   id, name, description, image, is_active, timestamps

### Products

-   id, category_id, name, description, price, image, stock_quantity, is_available, size (small/medium/large), is_featured, timestamps

### Carts

-   id, user_id, product_id, quantity, price, timestamps

### Orders

-   id, user_id, order_number, subtotal, tax, total, status, payment_status, payment_method, notes, timestamps

### Order Items

-   id, order_id, product_id, quantity, price, subtotal, timestamps

## Models & Relationships

-   **Category**: hasMany Products
-   **Product**: belongsTo Category, hasMany OrderItems, hasMany CartItems
-   **Cart**: belongsTo User, belongsTo Product
-   **Order**: belongsTo User, hasMany OrderItems
-   **OrderItem**: belongsTo Order, belongsTo Product

## Testing

Run the application:

```bash
php artisan serve
```

Test with cURL or Postman using the endpoints above.

## Security Notes

1. All sensitive routes are protected with `auth:sanctum` middleware
2. Admin routes should have additional admin role checking (implement as needed)
3. Use HTTPS in production
4. Implement rate limiting for API endpoints
5. Add CORS configuration for frontend integration

## Frontend Integration

The frontend (Vue.js) should:

1. Store the authentication token after login
2. Include the token in all protected API requests
3. Handle token expiration and refresh
4. Implement proper error handling

Example API call from frontend:

```javascript
const response = await fetch("http://localhost:8000/api/cart", {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});
```

## Next Steps

1. ✅ Migrations created
2. ✅ Models with relationships
3. ✅ Controllers with full CRUD
4. ✅ Factories for testing
5. ✅ Seeders with realistic data
6. ✅ API routes configured
7. 🔄 Add admin middleware for role-based access
8. 🔄 Implement image upload functionality
9. 🔄 Add pagination for large datasets
10. 🔄 Implement order notifications

## License

This project is part of the Koffeshop application.
