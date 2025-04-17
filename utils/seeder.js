const User = require('../models/User');
const Product = require('../models/Product');
const Rider = require('../models/Rider');
const Order = require('../models/Order');

const createSampleData = async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Rider.deleteMany({});
    await Order.deleteMany({});

    // 5 Fans
    const fans = await Product.insertMany([
      {
        name: "WindMax Turbo Fan",
        price: 1450,
        variants: [{ size: "medium", color: "white", stock: 10 }]
      },
      {
        name: "BreezeX Silent Fan",
        price: 1700,
        variants: [{ size: "large", color: "black", stock: 8 }]
      },
      {
        name: "Speedy Fan",
        price: 1150,
        variants: [{ size: "small", color: "grey", stock: 15 }]
      },
      {
        name: "AeroCool Desk Fan",
        price: 1300,
        variants: [{ size: "medium", color: "blue", stock: 12 }]
      },
      {
        name: "GlideMax Fan",
        price: 1550,
        variants: [{ size: "large", color: "brown", stock: 6 }]
      }
    ]);

    // 5 ACs
    const acs = await Product.insertMany([
      {
        name: "ChillPro AC 1.5 Ton",
        price: 31000,
        variants: [{ size: "1.5 ton", color: "white", stock: 4 }]
      },
      {
        name: "CoolBreeze Smart AC",
        price: 34500,
        variants: [{ size: "1 ton", color: "silver", stock: 5 }]
      },
      {
        name: "IceWind Window AC",
        price: 26500,
        variants: [{ size: "1.5 ton", color: "white", stock: 3 }]
      },
      {
        name: "FrostTech Inverter AC",
        price: 40000,
        variants: [{ size: "2 ton", color: "grey", stock: 2 }]
      },
      {
        name: "ZenCool Budget AC",
        price: 22500,
        variants: [{ size: "1 ton", color: "white", stock: 7 }]
      }
    ]);

    // Create one User
    const user = await new User({
      name: "Deepanshi",
      email: "deep@example.com",
      googleId: "google-uid-123",
      role: "customer",
      address: "123 Sample Road",
      phone: "9876543210"
    }).save();

    // Create Rider (User with role = rider)
    const riderUser = await new User({
      name: "Ravi",
      email: "ravi@example.com",
      googleId: "google-uid-456",
      role: "rider",
      address: "Rider Colony 101",
      phone: "9123456789"
    }).save();

    const rider = await new Rider({
      userId: riderUser._id
    }).save();

    // Create an Order
    const sampleProduct = fans[0];

    const order = await new Order({
      customerId: user._id,
      riderId: rider._id,
      productId: sampleProduct._id,
      totalPrice: sampleProduct.price,
      shippingAddress: "123 Sample Road"
    }).save();

    console.log("✅ Seeder data inserted: 5 Fans, 5 ACs, 1 User, 1 Rider, and 1 Order!");

  } catch (err) {
    console.error("❌ Error inserting sample data:", err);
  }
};

module.exports = createSampleData;
