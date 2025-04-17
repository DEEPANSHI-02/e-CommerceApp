const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
// const session = require("express-session");
// const password = require("passport");

dotenv.config();
connectDB();

const app = express();

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true
// }));
  


app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());
// app.use(morgan('dev'));

// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/rider', require('./routes/riderRoutes'));

// const authRoutes = require('./routes/authRoutes');
// app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});