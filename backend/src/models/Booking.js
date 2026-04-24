const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  deliveryLocation: {
    type: String,
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  vehicleType: {
    type: String,
    required: true
  },
  loadWeight: {
    type: Number,
    required: true
  },
  loadType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  trackingSteps: [{
    step: String,
    location: String,
    timestamp: Date,
    done: Boolean
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
