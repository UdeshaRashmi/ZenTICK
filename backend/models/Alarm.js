const mongoose = require('mongoose');

const AlarmSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  label: { type: String, default: '' },
  active: { type: Boolean, default: true },
  repeat: { type: [String], default: [] }, // e.g. ['mon','tue'] or empty for one-shot
  rampDuration: { type: Number, default: 30 }, // seconds to ramp volume
  maxVolume: { type: Number, default: 1.0 }, // 0.0 - 1.0
  lastTriggered: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alarm', AlarmSchema);
