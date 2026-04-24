const express = require('express');
const router = express.Router();
const { getFleet, getFleetUtilization } = require('../controllers/fleetController');

router.get('/', getFleet);
router.get('/utilization', getFleetUtilization);

module.exports = router;
