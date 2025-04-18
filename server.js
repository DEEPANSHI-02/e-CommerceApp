const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const createSampleData = require('./utils/seeder');

require('./middleware/auth');
require('./config/passport');

dotenv.config();
connectDB();

const app = express();


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
  
app.use(passport.initialize());
app.use(passport.session());


const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const riderRoutes = require('./routes/riderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rider', riderRoutes);

app.use('/auth', authRoutes);
app.use(express.json());

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