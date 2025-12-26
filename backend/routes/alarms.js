// routes/alarms.js
const express = require('express');
const {
  getAlarms,
  createAlarm,
  updateAlarm,
  deleteAlarm
} = require('../controllers/alarmController');

const router = express.Router();

router.get('/', getAlarms);
router.post('/', createAlarm);  
router.put('/:id', updateAlarm);
router.delete('/:id', deleteAlarm);
router.post('/:id/trigger', require('../controllers/alarmController').triggerAlarm);

module.exports = router;