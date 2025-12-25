// models/Alarm.js  (Only added virtual for minutes – no breaking change)
const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name for the alarm'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    default: 'Zen Timer'
  },
  duration: {
    type: Number, // stored in SECONDS
    required: [true, 'Please set duration'],
    min: [600, 'Minimum 10 minutes'],     // 10 min = 600 sec
    max: [7200, 'Maximum 2 hours']        // 120 min = 7200 sec
  },
  sound: {
    type: String,
    enum: ['bell', 'chime', 'gong', 'soft', 'nature'],
    default: 'chime'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual: duration in minutes (for API response)
alarmSchema.virtual('durationInMinutes').get(function () {
  return Math.round(this.duration / 60);
});

// When creating/updating, convert minutes → seconds if provided
alarmSchema.pre('save', function (next) {
  if (this.isModified('durationInMinutes') || this.durationInMinutes !== undefined) {
    this.duration = this.durationInMinutes * 60;
  }
  next();
});

alarmSchema.set('toJSON', { virtuals: true });
alarmSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Alarm', alarmSchema);