const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const createSampleData = require('./utils/seeder');

dotenv.config();

require('./middleware/auth');
require('./config/passport');


const app = express();

app.use(cors({
  origin: ['http://localhost:3003', 'http://localhost:3000', ], 
  credentials: true,
}));


const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const riderRoutes = require('./routes/riderRoutes');

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rider', riderRoutes);

app.use('/auth', authRoutes);



connectDB().then(() => {
  createSampleData();
});


app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});