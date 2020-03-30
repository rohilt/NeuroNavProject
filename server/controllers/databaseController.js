const mongoose = require('mongoose')
const Example = require('../models/examples.server.model.js')
const Appointment = require('../models/AppointmentModel.js')
const Patient = require('../models/PatientModel.js')
const config = require('../config/config.js')
const axios = require('axios')
const {google} = require('googleapis');
const fs = require('fs');

listEvents = (auth, response) => {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        // console.log('Upcoming 10 events:');
        // events.map((event, i) => {
        //   const start = event.start.dateTime || event.start.date;
        //   console.log(`${start} - ${event.summary}`);
        // });
        response.send(events);
      } else {
        // console.log('No upcoming events found.');
        response.send("error");
      }
    });
}

insertEvent = (auth, event, response) => {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: event,
    }, (err, event) => {
      if (err) return console.log('The API returned an error: ' + err);
        // console.log('Upcoming 10 events:');
        // events.map((event, i) => {
        //   const start = event.start.dateTime || event.start.date;
        //   console.log(`${start} - ${event.summary}`);
        // });
        response.send(event);
    });
};

exports.addPatient = async (req, res) => {
    console.log(req.query);
    Patient.create({
        name : req.query.name,
        middleInitial : req.query.middleInitial,
        lastName : req.query.lastName,
        dateOfBirth : req.query.dateOfBirth,
        phoneNumber : req.query.phoneNumber,
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
        patientName: req.query.patientName,
        startTime : req.query.start,
        endTime : req.query.end,
    }, (err) => {
        if (err) throw err;
        const {client_secret, client_id, redirect_uris} = config.credentials.web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
        
            oAuth2Client.setCredentials(config.token);
            insertEvent(oAuth2Client, {'summary': req.query.patientName,
            'start': {
            'dateTime': req.query.start + ':00',
            'timeZone': 'America/New_York',
            },
            'end': {
            'dateTime': req.query.end + ':00',
            'timeZone': 'America/New_York',
            }}, res);
    });
}

exports.viewCalendarEvents = async (req, res) => {
    fs.readFile('./credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        const {client_secret, client_id, redirect_uris} = JSON.parse(content).web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
      
        fs.readFile('./token.json', (err, token) => {
          if (err) return getAccessToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          listEvents(oAuth2Client, res);
        });
    });
}

exports.addCalendarEvent = async (req, res) => {
    fs.readFile('./credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        const {client_secret, client_id, redirect_uris} = JSON.parse(content).web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
      
        fs.readFile('./token.json', (err, token) => {
          if (err) return getAccessToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          insertEvent(oAuth2Client, {'start': {
            'dateTime': '2020-05-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
          },
          'end': {
            'dateTime': '2020-05-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
          }}, res);
        });
    });
}

exports.getPatients = async (req, res) => {
    Patient.find({}, async (err, docs) => {
        if (err) throw err;
        docs.forEach(async (doc) => {
            if (!doc.distanceToClinic || !doc.timeToClinic) {
                const origin = doc.address;
                console.log(doc.address);
                const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json?key=' + config.directions.key + '&origin=' + origin + '&destination=Parking Garage 10 Newell Dr, Gainesville, FL 32603');
                console.log(response.data);
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