# E-Commerce Website - Technical Architecture Documentation

## Overview
A modern, responsive E-Commerce website built with React.js frontend, Node.js/Express.js backend, and MongoDB Atlas database. The application enables users to explore products, view detailed product information, and manage a shopping cart with persistent state.

## Architecture Diagram
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (React.js)    │◄──►│   (Node.js +    │◄──►│  (MongoDB       │
│                 │    │   Express.js)   │    │   Atlas)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Technology Stack

### Frontend
- **React.js**: Core frontend framework for building the user interface
- **React Router**: Client-side routing for navigation between pages
- **Axios**: HTTP client for API communication
- **CSS3/SCSS**: Styling with responsive design principles
- **Local Storage**: Client-side cart state persistence

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for RESTful API
- **Mongoose**: MongoDB object modeling for Node.js
- **CORS**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable management

### Database
- **MongoDB Atlas**: Cloud-hosted MongoDB database
- **Collections**: Products, Users, Orders, Cart

### Development Tools
- **npm**: Package management
- **nodemon**: Development server auto-restart
- **concurrently**: Run frontend and backend simultaneously

## System Architecture

### 1. Frontend Architecture (React.js)
```
src/
├── components/
│   ├── common/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Loading.js
│   ├── product/
│   │   ├── ProductCard.js
│   │   ├── ProductList.js
│   │   └── ProductDetail.js
│   └── cart/
│       ├── CartItem.js
│       └── CartSummary.js
├── pages/
│   ├── Home.js
│   ├── Products.js
│   ├── ProductDetails.js
│   └── Cart.js
├── services/
│   └── api.js
├── context/
│   └── CartContext.js
├── styles/
│   └── global.css
└── App.js
```

### 2. Backend Architecture (Node.js + Express.js)
```
backend/
├── models/
│   ├── Product.js
│   ├── User.js
│   └── Order.js
├── routes/
│   ├── products.js
│   ├── cart.js
│   └── orders.js
├── middleware/
│   └── errorHandler.js
├── config/
│   └── database.js
├── controllers/
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
└── server.js
```

### 3. Database Schema (MongoDB)

#### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  ratings: {
    average: Number,
    count: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Cart Collection (Session-based)
```javascript
{
  _id: ObjectId,
  sessionId: String,
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Product Endpoints
- `GET /api/products` - Get all products with pagination and filtering
- `GET /api/products/:id` - Get single product details
- `GET /api/products/category/:category` - Get products by category

### Cart Endpoints
- `GET /api/cart/:sessionId` - Get cart items for session
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

## State Management

### Frontend State (React Context)
- **CartContext**: Manages global cart state
  - Cart items
  - Total quantity
  - Total price
  - Add/Remove/Update functions

### Backend State (MongoDB)
- Product inventory management
- Session-based cart persistence
- Order history

## Security Considerations
- Input validation and sanitization
- CORS configuration for allowed origins
- Environment variables for sensitive data
- Rate limiting on API endpoints
- Data validation using Mongoose schemas

## Performance Optimization
- Lazy loading of product images
- Pagination for product listings
- Debounced search functionality
- Cached API responses
- Optimized database queries with indexing

## Responsive Design
- Mobile-first approach
- Flexible grid system
- Responsive navigation
- Touch-friendly cart interactions
- Optimized for various screen sizes

## Deployment Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (Netlify/     │    │   (Heroku/      │    │  (MongoDB       │
│   Vercel)       │    │   Railway)      │    │   Atlas)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Development Workflow
1. Set up MongoDB Atlas cluster
2. Initialize backend with Express.js
3. Create database models and API endpoints
4. Initialize React frontend
5. Implement product catalog
6. Add cart functionality
7. Integrate frontend with backend APIs
8. Style and responsive design
9. Testing and optimization
10. Deployment

## Future Enhancements
- User authentication and profiles
- Payment gateway integration
- Order tracking and history
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for product management
- Email notifications
- Advanced search and filtering
- Inventory management alerts