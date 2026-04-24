const Booking = require('../models/Booking');

exports.getOverview = async (req, res) => {
  try {
    const activeShipments = await Booking.countDocuments({ status: { $in: ['pending', 'in-transit'] } });
    
    // Simulate other stats for dashboard
    const data = {
      activeShipments,
      attentionNeeded: 2,
      bookingsToday: 18,
      bookingsComparison: '+4',
      revenueMtd: '$24,500',
      revenueGrowth: '12%',
      onTimeRate: '92',
    };
    
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
