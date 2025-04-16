// utils/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');
const ApprovedEmail = require('../models/ApprovedEmail');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Sample data
const products = [
  {
    name: 'Premium Ceiling Fan',
    description: 'A high-quality ceiling fan with remote control and energy-saving features',
    category: 'fan',
    basePrice: 129.99,
    brand: 'BreezeMax',
    featuredImage: 'https://via.placeholder.com/600x400?text=Ceiling+Fan',
    rating: {
      count: 156,
      average: 4.7
    },
    variants: [
      {
        size: '42-inch',
        color: 'White',
        price: 129.99,
        stock: 25,
        sku: 'CF-WH-42',
        images: ['https://via.placeholder.com/600x400?text=White+Fan']
      },
      {
        size: '42-inch',
        color: 'Brown',
        price: 129.99,
        stock: 15,
        sku: 'CF-BR-42',
        images: ['https://via.placeholder.com/600x400?text=Brown+Fan']
      },
      {
        size: '48-inch',
        color: 'White',
        price: 149.99,
        stock: 20,
        sku: 'CF-WH-48',
        images: ['https://via.placeholder.com/600x400?text=White+Fan+Large']
      },
      {
        size: '48-inch',
        color: 'Brown',
        price: 149.99,
        stock: 10,
        sku: 'CF-BR-48',
        images: ['https://via.placeholder.com/600x400?text=Brown+Fan+Large']
      }
    ],
    specifications: {
      'Power': '60W',
      'Speeds': '3',
      'Remote Control': 'Yes',
      'Warranty': '2 years'
    }
  },
  {
    name: 'Compact Table Fan',
    description: 'A portable and powerful table fan, perfect for small spaces',
    category: 'fan',
    basePrice: 49.99,
    brand: 'BreezeMax',
    featuredImage: 'https://via.placeholder.com/600x400?text=Table+Fan',
    rating: {
      count: 89,
      average: 4.5
    },
    variants: [
      {
        size: '12-inch',
        color: 'White',
        price: 49.99,
        stock: 30,
        sku: 'TF-WH-12',
        images: ['https://via.placeholder.com/600x400?text=White+Table+Fan']
      },
      {
        size: '12-inch',
        color: 'Black',
        price: 49.99,
        stock: 35,
        sku: 'TF-BL-12',
        images: ['https://via.placeholder.com/600x400?text=Black+Table+Fan']
      },
      {
        size: '16-inch',
        color: 'White',
        price: 59.99,
        stock: 25,
        sku: 'TF-WH-16',
        images: ['https://via.placeholder.com/600x400?text=White+Table+Fan+Large']
      },
      {
        size: '16-inch',
        color: 'Black',
        price: 59.99,
        stock: 20,
        sku: 'TF-BL-16',
        images: ['https://via.placeholder.com/600x400?text=Black+Table+Fan+Large']
      }
    ],
    specifications: {
      'Power': '35W',
      'Speeds': '3',
      'Oscillation': 'Yes',
      'Warranty': '1 year'
    }
  },
  {
    name: 'Tower Fan with Air Purifier',
    description: 'Sleek tower fan with built-in air purification system for better air quality',
    category: 'fan',
    basePrice: 199.99,
    brand: 'PureAir',
    featuredImage: 'https://via.placeholder.com/600x400?text=Tower+Fan',
    rating: {
      count: 42,
      average: 4.8
    },
    variants: [
      {
        size: '36-inch',
        color: 'Silver',
        price: 199.99,
        stock: 15,
        sku: 'TW-SL-36',
        images: ['https://via.placeholder.com/600x400?text=Silver+Tower+Fan']
      },
      {
        size: '36-inch',
        color: 'Black',
        price: 199.99,
        stock: 12,
        sku: 'TW-BL-36',
        images: ['https://via.placeholder.com/600x400?text=Black+Tower+Fan']
      },
      {
        size: '42-inch',
        color: 'Silver',
        price: 229.99,
        stock: 10,
        sku: 'TW-SL-42',
        images: ['https://via.placeholder.com/600x400?text=Silver+Tower+Fan+Large']
      }
    ],
    specifications: {
      'Power': '65W',
      'Speeds': '10',
      'Remote Control': 'Yes',
      'Timer': 'Yes',
      'HEPA Filter': 'Yes',
      'Warranty': '3 years'
    }
  },
  {
    name: 'Split Air Conditioner',
    description: 'Energy-efficient split AC with cooling and heating capabilities',
    category: 'air-conditioner',
    basePrice: 599.99,
    brand: 'CoolBreeze',
    featuredImage: 'https://via.placeholder.com/600x400?text=Split+AC',
    rating: {
      count: 78,
      average: 4.6
    },
    variants: [
      {
        size: '1-ton',
        color: 'White',
        price: 599.99,
        stock: 10,
        sku: 'AC-WH-1T',
        images: ['https://via.placeholder.com/600x400?text=White+AC+1T']
      },
      {
        size: '1.5-ton',
        color: 'White',
        price: 699.99,
        stock: 8,
        sku: 'AC-WH-1.5T',
        images: ['https://via.placeholder.com/600x400?text=White+AC+1.5T']
      },
      {
        size: '2-ton',
        color: 'White',
        price: 799.99,
        stock: 5,
        sku: 'AC-WH-2T',
        images: ['https://via.placeholder.com/600x400?text=White+AC+2T']
      }
    ],
    specifications: {
      'Cooling Capacity': 'Variable',
      'Energy Rating': '5 Star',
      'Noise Level': 'Low',
      'Remote Control': 'Yes',
      'Wi-Fi Enabled': 'Yes',
      'Warranty': '5 years on compressor'
    }
  },
  {
    name: 'Portable Air Conditioner',
    description: 'Compact and movable AC unit, perfect for rooms without fixed AC installation',
    category: 'air-conditioner',
    basePrice: 349.99,
    brand: 'CoolSpot',
    featuredImage: 'https://via.placeholder.com/600x400?text=Portable+AC',
    rating: {
      count: 65,
      average: 4.3
    },
    variants: [
      {
        size: '8000-BTU',
        color: 'White',
        price: 349.99,
        stock: 15,
        sku: 'PA-WH-8K',
        images: ['https://via.placeholder.com/600x400?text=White+Portable+AC']
      },
      {
        size: '8000-BTU',
        color: 'Black',
        price: 349.99,
        stock: 12,
        sku: 'PA-BL-8K',
        images: ['https://via.placeholder.com/600x400?text=Black+Portable+AC']
      },
      {
        size: '12000-BTU',
        color: 'White',
        price: 449.99,
        stock: 10,
        sku: 'PA-WH-12K',
        images: ['https://via.placeholder.com/600x400?text=White+Portable+AC+Large']
      },
      {
        size: '12000-BTU',
        color: 'Black',
        price: 449.99,
        stock: 8,
        sku: 'PA-BL-12K',
        images: ['https://via.placeholder.com/600x400?text=Black+Portable+AC+Large']
      }
    ],
    specifications: {
      'Cooling Area': 'Up to 350 sq ft',
      'Energy Rating': '4 Star',
      'Dehumidifier': 'Yes',
      'Remote Control': 'Yes',
      'Warranty': '2 years'
    }
  }
];

const approvedEmails = [
  {
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    email: 'rider1@example.com',
    role: 'rider'
  },
  {
    email: 'rider2@example.com',
    role: 'rider'
  },
  {
    email: 'customer@example.com',
    role: 'customer'
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await ApprovedEmail.deleteMany();
    
    // Import products
    await Product.insertMany(products);
    
    // Import approved emails
    await ApprovedEmail.insertMany(approvedEmails);
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await ApprovedEmail.deleteMany();
    
    console.log('Data deleted successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`);
    process.exit(1);
  }
};

// Parse command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please provide a valid option: -i (import) or -d (delete)');
  process.exit();
}