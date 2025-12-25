const express = require('express');
const router = express.Router();
const controller = require('../controllers/alarmController');

router.get('/', controller.getAlarms);
router.post('/', controller.createAlarm);
router.get('/:id', controller.getAlarmById);
router.put('/:id', controller.updateAlarm);
router.delete('/:id', controller.deleteAlarm);
router.post('/:id/trigger', controller.triggerAlarm);

module.exports = router;
