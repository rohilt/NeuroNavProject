const mongoose = require('mongoose')
const Example = require('../models/examples.server.model.js')
const Appointment = require('../models/AppointmentModel.js')
const User = require('../models/user.js')
// const config = require('../config/config.js')
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

insertEvent = async (auth, event, calendarId, req, response) => {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
    }, (err, newEvent) => {
      if (err) return console.log('The API returned an error: ' + err);
        // console.log('Upcoming 10 events:');
        // events.map((event, i) => {
        //   const start = event.start.dateTime || event.start.date;
        //   console.log(`${start} - ${event.summary}`);
        // });
        Appointment.create({
            patientId : req.query.patientId,
            patientName: req.query.patientName,
            startTime : req.query.startTime,
            endTime : req.query.endTime,
            doctor: req.query.doctor,
            location: req.query.location,
            description: req.query.description,
            eventId : newEvent.data.id
        }, (err) => {
            if (err) throw err;
        });
        response.send(event);
    });
};

exports.addPatient = async (req, res) => {
    User.create({
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

exports.deletePatient = async (req, res) => {
    User.deleteOne( {"_id" : req.query.id}, function(err) {
        if(err) console.log(err);
    });
    res.send('deleted')
}

exports.editPatient = async (req,res) => {
    var outTime = '';
    var outDist = '';

    try {
          const origin = req.body.newData.address;
          const destination = '29.639418, -82.341230';
          const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json?key=' + (process.env.MAP_KEY || require('../config/config.js').directions.key) + '&origin=' + origin + '&destination='+ destination);
          if (!response.data.routes) {
            outTime = '';
            outDist = '';
          }
          else {
            outDist = response.data.routes[0].legs[0].distance.text,
              outTime = response.data.routes[0].legs[0].duration.text
          }
        // })
      }
      catch (err) {
        console.log(err);
      }

    User.findOneAndUpdate({"_id" : req.body.newData._id}, {
        name:           req.body.newData.name,
        middleInitial : req.body.newData.middleInitial,
        lastName :      req.body.newData.lastName,
        dateOfBirth :   req.body.newData.dateOfBirth,
        phoneNumber :   req.body.newData.phoneNumber,
        address :       req.body.newData.address,
        emailAddress :  req.body.newData.emailAddress,
        distanceToClinic : outDist,
        timeToClinic : outTime
        }, function(err, result){
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

exports.setCalendarId = async (req, res) => {
    req.app.locals.calendarId = req.query.calendarId;
    res.send("success");
}

exports.getCalendarId = async (req, res) => {
    res.send(req.app.locals.calendarId)
}

exports.addAppointment = async (req, res) => {
    const webCredentials = {
        "client_id": process.env.WEB_CLIENT_ID || require('../config/config.js').credentials.web.client_id,
        "project_id": process.env.WEB_PROJECT_ID || require('../config/config.js').credentials.web.project_id,
        "auth_uri": process.env.WEB_AUTH_URI || require('../config/config.js').credentials.web.auth_uri,
        "token_uri": process.env.WEB_TOKEN_URI || require('../config/config.js').credentials.web.token_uri,
        "auth_provider_x509_cert_url": process.env.WEB_AUTH_PROV || require('../config/config.js').credentials.web.auth_provider_x509_cert_url,
        "client_secret": process.env.WEB_CLIENT_SECRET || require('../config/config.js').credentials.web.client_secret,
        "redirect_uris": ["http://www.google.com/"]
    }
    const token = {
        "access_token": process.env.TOKEN_ACCESS || require('../config/config.js').token.access_token,
        "refresh_token": process.env.TOKEN_REFRESH || require('../config/config.js').token.refresh_token,
        "scope": process.env.TOKEN_SCOPE || require('../config/config.js').token.scope,
        "token_type": process.env.TOKEN_TOKEN_TYPE || require('../config/config.js').token.token_type,
        "expiry_date": 1585435903384
    }
    const {client_secret, client_id, redirect_uris} = webCredentials;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(token);
    insertEvent(oAuth2Client, {
        'summary': req.query.patientName,
        'start': {
            'dateTime': req.query.startTime,
            'timeZone': 'America/New_York',
        },
        'end': {
            'dateTime': req.query.endTime,
            'timeZone': 'America/New_York',
        }}, req.app.locals.calendarId, req, res);
}

exports.deleteAppointment = async (req, res) => {
    Appointment.deleteOne( {"_id" : req.query.id}, function(err) {
        if(err) console.log(err);
    });
    res.send('deleted')
}

exports.editAppointment = async (req, res) => {
    Appointment.findOneAndUpdate({"_id" : req.body.newData._id}, {
        patientId   : req.body.newData.patientId,
        patientName : req.body.newData.patientName,
        startTime   : req.body.newData.startTime,
        endTime     : req.body.newData.endTime,
        description : req.body.newData.description,
        doctor      : req.body.newData.doctor,
        location    : req.body.newData.location
        }, function(err, result){
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
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
    User.find({}, async (err, docs) => {
        if (err) throw err;
        docs.forEach(async (doc) => {
            if (!doc.distanceToClinic || !doc.timeToClinic) {
                const origin = doc.address;
                console.log(doc.address);
                const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json?key=' + (process.env.MAP_KEY || require('../config/config.js').directions.key) + '&origin=' + origin + '&destination=Parking Garage 10 Newell Dr, Gainesville, FL 32603');
                console.log(response.data);
                if (!response.data.routes) {
                    doc.distanceToClinic = "Invalid address";
                    doc.timeToClinic = "Invalid address";
                }
                else {
                    doc.distanceToClinic = response.data.routes[0].legs[0].distance.text;
                    doc.timeToClinic = response.data.routes[0].legs[0].duration.text;
                }
                doc.save();
            }
        });
        // console.log(docs[docs.length-1])
        res.send(docs);
    });
}

exports.getAppointments = async (req, res) => {
    Appointment.find({}, (err, docs) => {
        if (err) throw err;
        res.send(docs);
    });
}