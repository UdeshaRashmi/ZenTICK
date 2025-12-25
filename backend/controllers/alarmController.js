// controllers/alarmController.js
const Alarm = require('../models/Alarm');

// Helper to accept durationInMinutes in body
const processDuration = (body) => {
  if (body.durationInMinutes !== undefined) {
    body.duration = Number(body.durationInMinutes) * 60;
    delete body.durationInMinutes; // clean up
  }
  return body;
};

// Get all alarms (returns durationInMinutes)
exports.getAlarms = async (req, res, next) => {
  try {
    const alarms = await Alarm.find().sort({ duration: 1 });
    res.json({
      success: true,
      count: alarms.length,
      data: alarms
    });
  } catch (error) {
    next(error);
  }
};

// Create new alarm
exports.createAlarm = async (req, res, next) => {
  try {
    const processedBody = processDuration(req.body);
    const alarm = await Alarm.create(processedBody);
    res.status(201).json({
      success: true,
      data: alarm
    });
  } catch (error) {
    next(error);
  }
};

// Update alarm
exports.updateAlarm = async (req, res, next) => {
  try {
    const processedBody = processDuration(req.body);
    const alarm = await Alarm.findByIdAndUpdate(
      req.params.id,
      processedBody,
      { new: true, runValidators: true }
    );

    if (!alarm) {
      const err = new Error('Alarm not found');
      err.statusCode = 404;
      return next(err);
    }

    res.json({
      success: true,
      data: alarm
    });
  } catch (error) {
    next(error);
  }
};

// Delete unchanged
exports.deleteAlarm = async (req, res, next) => {
  try {
    const alarm = await Alarm.findByIdAndDelete(req.params.id);
    if (!alarm) {
      const err = new Error('Alarm not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json({
      success: true,
      message: 'Alarm deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};