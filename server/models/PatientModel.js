// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const patientModel = new mongoose.Schema({
  name: {type: String, required: true},
  emailAddress: {type: String, required: true},
  address: {type: String, required: true},
});

module.exports = mongoose.model('patient', patientModel);