# ShopEase - E-Commerce Website

A modern, responsive E-Commerce website built with React.js frontend, Node.js/Express.js backend, and MongoDB Atlas database. The application enables users to explore products, view detailed product information, and manage a shopping cart with persistent state.

## 🚀 Features

### Frontend Features
- **Product Catalog**: Browse products with pagination, filtering, and search
- **Product Details**: Detailed product pages with images, descriptions, and ratings
- **Shopping Cart**: Add, remove, and update items with persistent state
- **Responsive Design**: Mobile-first approach with optimized layouts
- **Category Navigation**: Browse products by categories
- **Real-time Updates**: Instant cart updates and stock validation

### Backend Features
- **RESTful API**: Well-structured API endpoints for products and cart
- **Data Validation**: Comprehensive input validation and error handling
- **Security**: Rate limiting, CORS, and input sanitization
- **Performance**: Optimized database queries with indexing
- **Session Management**: Cart persistence using session-based storage

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI framework
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **CSS3** - Modern styling with custom properties

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## 📁 Project Structure

```
ecommerce-website/
├── backend/                 # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── scripts/           # Utility scripts
│   └── server.js          # Main server file
├── frontend/               # React frontend
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # Reusable components
│       ├── context/       # React context
│       ├── pages/         # Page components
│       ├── services/      # API services
│       └── styles/        # Global styles
├── package.json           # Root package.json
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB installation)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-website
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
npm run install-server

# Install frontend dependencies
npm run install-client
```

3. **Environment Setup**
```bash
# Copy environment template
cp backend/.env.example backend/.env
```

4. **Configure Environment Variables**
Edit `backend/.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

5. **Seed Database (Optional)**
```bash
cd backend
node scripts/seedData.js
```

6. **Start Development Servers**
```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run server  # Backend only
npm run client  # Frontend only
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📖 API Documentation

### Products Endpoints
- `GET /api/products` - Get all products with pagination and filtering
- `GET /api/products/:id` - Get single product details
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories

### Cart Endpoints
- `GET /api/cart/:sessionId` - Get cart items for session
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:sessionId/:productId` - Remove item from cart
- `DELETE /api/cart/clear/:sessionId` - Clear entire cart

### Query Parameters for Products
- `page` - Page number for pagination
- `limit` - Number of items per page
- `category` - Filter by category
- `search` - Search in product names and descriptions
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort by: `price-asc`, `price-desc`, `name`, `rating`

## 🎨 Component Architecture

### Common Components
- `Header` - Navigation and search
- `Footer` - Site footer with links
- `Loading` - Loading spinner component

### Product Components
- `ProductCard` - Individual product display
- `ProductList` - Product grid with filters

### Cart Components
- `CartItem` - Individual cart item
- `CartSummary` - Order summary and checkout

### Pages
- `Home` - Landing page with featured products
- `Products` - Product catalog with filters
- `ProductDetails` - Individual product page
- `Cart` - Shopping cart page
- `CategoryProducts` - Category-specific products

## 🛡️ Security Features

- **Input Validation**: Comprehensive validation using Mongoose schemas
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Helmet middleware for security headers
- **Error Handling**: Secure error responses without sensitive data exposure

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: 480px, 768px, 1024px, 1200px
- **Flexible Grid**: CSS Grid and Flexbox layouts
- **Touch-Friendly**: Optimized for touch interactions

## 🔧 Development

### Available Scripts
- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run build` - Build frontend for production
- `npm start` - Start backend in production mode

### Code Style
- ESLint configuration for consistent code style
- Prettier for code formatting
- Component-based architecture
- Semantic HTML and accessible design

## 🚢 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy using git or CLI
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=<production-database-url>
CORS_ORIGIN=<frontend-production-url>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB Atlas for database hosting
- Unsplash for product images
- Inter font family for typography

## 📞 Support

For support, email support@shopease.com or create an issue on GitHub.