const Booking = require('../models/Booking');

exports.getBookings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    
    // Sort and limit, populate related vehicle
    const bookings = await Booking.find()
      .populate('vehicleId', 'name type')
      .sort({ createdAt: -1 })
      .limit(limit);
      
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
