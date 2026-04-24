const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['truck', 'mini-lcv', 'flatbed', 'tempo'],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  pricePerKm: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'on-trip', 'in-service'],
    default: 'available'
  },
  currentBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
