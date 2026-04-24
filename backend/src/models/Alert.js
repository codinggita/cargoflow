const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['error', 'warning', 'success'],
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Alert', alertSchema);
