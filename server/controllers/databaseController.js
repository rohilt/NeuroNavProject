const mongoose = require('mongoose')
const Example = require('../models/examples.server.model.js')
const Appointment = require('../models/AppointmentModel.js')
const Patient = require('../models/PatientModel.js')
const config = require('../config/config.js')
const axios = require('axios')

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
        patientId : req.query.patientId,
        date : req.query.date,
    }, (err) => {
        if (err) throw err;
    });
    res.send('world')
}

exports.getPatients = async (req, res) => {
    Patient.find({}, async (err, docs) => {
        if (err) throw err;
        docs.forEach(async (doc) => {
            if (!doc.distanceToClinic || !doc.timeToClinic) {
                const origin = doc.address;
                const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json?key=' + config.directions.key + '&origin=' + origin + '&destination=Parking Garage 10 Newell Dr, Gainesville, FL 32603');
                doc.distanceToClinic = response.data.routes[0].legs[0].distance.text;
                doc.timeToClinic = response.data.routes[0].legs[0].duration.text;
                doc.save();
            }
        });
        res.send(docs);
    });
}

exports.getAppointments = async (req, res) => {
    Appointment.find({}, (err, docs) => {
        if (err) throw err;
        res.send(docs);
    });
}