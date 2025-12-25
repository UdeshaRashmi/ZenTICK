const Alarm = require('../models/Alarm');

exports.getAlarms = async (req, res, next) => {
  try {
    const alarms = await Alarm.find().sort('time');
    res.json(alarms);
  } catch (err) {
    next(err);
  }
};

exports.createAlarm = async (req, res, next) => {
  try {
    const { time, label, active, repeat, rampDuration, maxVolume } = req.body;
    if (!time) return res.status(400).json({ message: 'time is required' });

    const alarm = new Alarm({
      time,
      label: label || '',
      active: typeof active === 'boolean' ? active : true,
      repeat: Array.isArray(repeat) ? repeat : [],
      rampDuration: typeof rampDuration === 'number' ? rampDuration : 30,
      maxVolume: typeof maxVolume === 'number' ? Math.min(Math.max(maxVolume, 0), 1) : 1.0
    });

    await alarm.save();
    res.status(201).json(alarm);
  } catch (err) {
    next(err);
  }
};

exports.getAlarmById = async (req, res, next) => {
  try {
    const alarm = await Alarm.findById(req.params.id);
    if (!alarm) return res.status(404).json({ message: 'Alarm not found' });
    res.json(alarm);
  } catch (err) {
    next(err);
  }
};

exports.updateAlarm = async (req, res, next) => {
  try {
    const updated = await Alarm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Alarm not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteAlarm = async (req, res, next) => {
  try {
    const removed = await Alarm.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Alarm not found' });
    res.json({ message: 'Alarm deleted' });
  } catch (err) {
    next(err);
  }
};

// Trigger endpoint: mark lastTriggered and return alarm payload — frontend can call this to test/play
exports.triggerAlarm = async (req, res, next) => {
  try {
    const alarm = await Alarm.findById(req.params.id);
    if (!alarm) return res.status(404).json({ message: 'Alarm not found' });
    alarm.lastTriggered = new Date();
    await alarm.save();
    // Return alarm settings so frontend can perform smooth ramping
    res.json({
      id: alarm._id,
      time: alarm.time,
      label: alarm.label,
      rampDuration: alarm.rampDuration,
      maxVolume: alarm.maxVolume
    });
  } catch (err) {
    next(err);
  }
};
