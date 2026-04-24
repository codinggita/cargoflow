const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load models
const Vehicle = require('./src/models/Vehicle');
const Booking = require('./src/models/Booking');
const Alert = require('./src/models/Alert');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const vehicles = [
  { name: 'Tata Ace', type: 'mini-lcv', capacity: 0.75, pricePerKm: 15, status: 'available' },
  { name: 'Ashok Leyland Dost', type: 'mini-lcv', capacity: 1.25, pricePerKm: 18, status: 'on-trip' },
  { name: 'Mahindra Bolero Pickup', type: 'mini-lcv', capacity: 1.5, pricePerKm: 20, status: 'available' },
  { name: 'Tata 407', type: 'tempo', capacity: 2.5, pricePerKm: 25, status: 'on-trip' },
  { name: 'Eicher Pro', type: 'truck', capacity: 5.0, pricePerKm: 40, status: 'available' },
  { name: 'Tata LPT 1109', type: 'truck', capacity: 7.0, pricePerKm: 50, status: 'in-service' },
  { name: 'BharatBenz 1617R', type: 'truck', capacity: 10.0, pricePerKm: 65, status: 'available' },
  { name: 'Ashok Leyland Captain', type: 'truck', capacity: 15.0, pricePerKm: 85, status: 'on-trip' },
  { name: 'Tata Signa Flatbed', type: 'flatbed', capacity: 20.0, pricePerKm: 110, status: 'available' },
  { name: 'Volvo FM400 Flatbed', type: 'flatbed', capacity: 25.0, pricePerKm: 150, status: 'available' }
];

const alerts = [
  { message: 'Vehicle Tata 407 delayed due to traffic on NH-48', type: 'warning' },
  { message: 'Payment gateway timeout for booking CF-1029', type: 'error' },
  { message: 'Fleet utilization crossed 85%', type: 'success' },
  { message: 'Maintenance scheduled for Tata LPT 1109', type: 'warning' },
  { message: '3 new driver registrations pending approval', type: 'success' }
];

const importData = async () => {
  try {
    await Vehicle.deleteMany();
    await Booking.deleteMany();
    await Alert.deleteMany();

    const createdVehicles = await Vehicle.insertMany(vehicles);
    await Alert.insertMany(alerts);

    // Create bookings linked to vehicles
    const bookings = [];
    const statuses = ['pending', 'in-transit', 'delivered', 'cancelled'];
    const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Kolkata'];

    for (let i = 1; i <= 20; i++) {
      const v = createdVehicles[Math.floor(Math.random() * createdVehicles.length)];
      const from = locations[Math.floor(Math.random() * locations.length)];
      let to = locations[Math.floor(Math.random() * locations.length)];
      while(to === from) {
        to = locations[Math.floor(Math.random() * locations.length)];
      }

      bookings.push({
        bookingId: `CF-10${50+i}`,
        pickupLocation: from,
        deliveryLocation: to,
        vehicleId: v._id,
        vehicleType: v.type,
        loadWeight: Math.floor(Math.random() * v.capacity) + 1,
        loadType: 'General Goods',
        status: statuses[Math.floor(Math.random() * statuses.length)],
        amount: Math.floor(Math.random() * 5000) + 1500,
        trackingSteps: [
          { step: 'Booked', location: from, timestamp: new Date(), done: true }
        ]
      });
    }

    await Booking.insertMany(bookings);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Vehicle.deleteMany();
    await Booking.deleteMany();
    await Alert.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
