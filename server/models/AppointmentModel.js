// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
});

module.exports = mongoose.model('appointment', appointmentModel);