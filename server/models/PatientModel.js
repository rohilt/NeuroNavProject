// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const patientModel = new mongoose.Schema({
  name: {type: String, required: true},
  middleInitial: {type: String},
  lastName: {type: String},
  dateOfBirth: {type: Date},
  phoneNumber: {type: String},
  emailAddress: {type: String, required: true},
  address: {type: String, required: true},
  distanceToClinic: {type: String},
  timeToClinic: {type: String},
  // TODO: add unique, required flags as needed
});

module.exports = mongoose.model('patient', patientModel);