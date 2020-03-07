const mongoose = require('mongoose')
const Example = require('../models/examples.server.model.js')
const Appointment = require('../models/AppointmentModel.js')
const Patient = require('../models/PatientModel.js')

exports.addPatient = async (req, res) => {
    Patient.create({
        name : req.query.name,
        address : req.query.address,
        emailAddress : req.query.emailAddress
    }, (err) => {
        if (err) throw err;
    });
    res.send('world')
};

exports.addAppointment = async (req, res) => {
    Appointment.create({
        name : req.query.name,
        date : req.query.date,
    }, (err) => {
        if (err) throw err;
    });
    res.send('world')
}

exports.getPatients = async (req, res) => {
    Patient.find({}, (err, docs) => {
        if (err) throw err;
        res.send(docs);
    });
}

exports.getAppointments = async (req, res) => {
    Appointment.find({}, (err, docs) => {
        if (err) throw err;
        res.send(docs);
    });
}