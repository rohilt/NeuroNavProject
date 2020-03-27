// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
  patientId: {type: mongoose.Schema.ObjectId, required: true},
  date: {type: Date, required: true},
  location: {type: String},
  description: {type: String}
});

module.exports = mongoose.model('appointment', appointmentModel);