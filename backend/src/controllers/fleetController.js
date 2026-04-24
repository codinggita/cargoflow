const Vehicle = require('../models/Vehicle');

exports.getFleet = async (req, res) => {
  try {
    const fleet = await Vehicle.find();
    res.status(200).json({ success: true, data: fleet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFleetUtilization = async (req, res) => {
  try {
    const fleet = await Vehicle.find();
    
    // Group by type and calculate utilization
    // Types: 'truck', 'mini-lcv', 'flatbed', 'tempo'
    const utilization = {
      truck: { total: 0, active: 0 },
      'mini-lcv': { total: 0, active: 0 },
      flatbed: { total: 0, active: 0 },
      tempo: { total: 0, active: 0 }
    };

    fleet.forEach(v => {
      if (utilization[v.type]) {
        utilization[v.type].total += 1;
        if (v.status === 'on-trip') {
          utilization[v.type].active += 1;
        }
      }
    });

    const stats = Object.keys(utilization).map(type => {
      const { total, active } = utilization[type];
      const percentage = total > 0 ? Math.round((active / total) * 100) : 0;
      return { type, total, active, percentage };
    });

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
