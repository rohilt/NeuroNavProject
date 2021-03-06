// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
  patientId: {type: mongoose.Schema.ObjectId, required: true},
  patientName: {type: String},
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: true},
  doctor: {type: String},
  location: {type: String},
  description: {type: String},
  eventId: {type: String},
  reminder: {type: String}
});

module.exports = mongoose.model('appointment', appointmentModel);