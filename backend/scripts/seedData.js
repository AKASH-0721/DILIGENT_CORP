const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 50,
    featured: true,
    ratings: { average: 4.5, count: 128 }
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring and GPS functionality.",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 30,
    featured: true,
    ratings: { average: 4.3, count: 95 }
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly t-shirt made from 100% organic cotton.",
    price: 29.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 100,
    featured: false,
    ratings: { average: 4.2, count: 67 }
  },
  {
    name: "Programming Fundamentals Book",
    description: "Complete guide to learning programming fundamentals with practical examples.",
    price: 39.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    stock: 25,
    featured: false,
    ratings: { average: 4.7, count: 234 }
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Compact speaker with powerful sound and waterproof design.",
    price: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    stock: 75,
    featured: true,
    ratings: { average: 4.4, count: 89 }
  },
  {
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with extra cushioning for comfort during practice.",
    price: 49.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    stock: 60,
    featured: false,
    ratings: { average: 4.6, count: 156 }
  },
  {
    name: "Skincare Set Deluxe",
    description: "Complete skincare routine with cleanser, toner, serum, and moisturizer.",
    price: 89.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500",
    stock: 40,
    featured: true,
    ratings: { average: 4.8, count: 201 }
  },
  {
    name: "Denim Jeans Classic",
    description: "Timeless denim jeans with comfortable fit and durable construction.",
    price: 69.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    stock: 80,
    featured: false,
    ratings: { average: 4.1, count: 143 }
  },
  {
    name: "Indoor Plant Starter Kit",
    description: "Everything you need to start your indoor garden including pots, soil, and seeds.",
    price: 34.99,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
    stock: 35,
    featured: false,
    ratings: { average: 4.3, count: 78 }
  },
  {
    name: "Building Blocks Creative Set",
    description: "Educational building blocks to spark creativity and imagination in children.",
    price: 24.99,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1558877385-1f9dae3bc5fd?w=500",
    stock: 90,
    featured: false,
    ratings: { average: 4.5, count: 112 }
  },
  {
    name: "Professional Camera Lens",
    description: "High-quality telephoto lens for professional photography.",
    price: 899.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
    stock: 15,
    featured: true,
    ratings: { average: 4.9, count: 45 }
  },
  {
    name: "Running Shoes Performance",
    description: "Lightweight running shoes designed for maximum comfort and performance.",
    price: 129.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 55,
    featured: true,
    ratings: { average: 4.4, count: 167 }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');
    
    console.log(`${sampleProducts.length} products added to the database`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();