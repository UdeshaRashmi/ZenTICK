// controllers/alarmController.js
const Alarm = require('../models/Alarm');

// Helper: Convert durationInMinutes → duration (seconds)
const processDuration = (body) => {
  body = body || {};
  if (body.durationInMinutes !== undefined) {
    const minutes = Number(body.durationInMinutes);
    if (isNaN(minutes)) {
      throw new Error('durationInMinutes must be a valid number');
    }
    if (minutes < 10 || minutes > 120) {
      throw new Error('durationInMinutes must be between 10 and 120');
    }
    body.duration = Math.round(minutes * 60);
    delete body.durationInMinutes;
  }
  return body;
};

// GET /api/alarms
exports.getAlarms = async (req, res, next) => {
  try {
    const alarms = await Alarm.find().sort({ duration: 1 });
    return res.json({  // ← Use return to prevent double response
      success: true,
      count: alarms.length,
      data: alarms
    });
  } catch (error) {
    return next(error);
  }
};

// POST /api/alarms
exports.createAlarm = async (req, res, next) => {
  try {
    const processedBody = processDuration(req.body);

    const alarm = await Alarm.create(processedBody);

    return res.status(201).json({
      success: true,
      data: alarm
    });
  } catch (error) {
    return next(error);  // ← This is safe now
  }
};

// PUT /api/alarms/:id
exports.updateAlarm = async (req, res, next) => {
  try {
    const processedBody = processDuration(req.body);

    const alarm = await Alarm.findByIdAndUpdate(
      req.params.id,
      processedBody,
      { new: true, runValidators: true }
    );

    if (!alarm) {
      return res.status(404).json({
        success: false,
        message: 'Alarm not found'
      });
    }

    return res.json({
      success: true,
      data: alarm
    });
  } catch (error) {
    return next(error);
  }
};

// DELETE /api/alarms/:id
exports.deleteAlarm = async (req, res, next) => {
  try {
    const alarm = await Alarm.findByIdAndDelete(req.params.id);

    if (!alarm) {
      return res.status(404).json({
        success: false,
        message: 'Alarm not found'
      });
    }

    return res.json({
      success: true,
      message: 'Alarm deleted successfully'
    });
  } catch (error) {
    return next(error);
  }
};