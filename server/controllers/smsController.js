const axios = require('axios')
const mongoose = require('mongoose')

const accountSid = process.env.TWILIO_ACCOUNT_SID || require('../config/config.js').texting.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN || require('../config/config.js').texting.authToken;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const Appointment = require('../models/AppointmentModel.js')
const User = require('../models/user.js')


  exports.sendText = async (req, res) => {
    try {
      client.messages
      .create({
         body: req.body.body,
         from: '+13345819814',
         to: req.body.to 
       })
      .then(message => res.send({success: true}));
    }
    catch (err) {
      res.send(err);
    }
  }

  exports.receiveText = (req, res) => {
    // console.log(req)
    // const message = twiml.message();
    // message.body(`Incoming message from ${req.body.From}: ${req.body.Body}`);
    // twiml.message(JSON.stringify(req));
    // message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
    // if (req.body.Body == 'hello') {
    //   twiml.message('Hi!');
    // } else if (req.body.Body == 'bye') {
    //   twiml.message('Goodbye');
    // } else {
    //   twiml.message(
    //     'No Body param match, Twilio sends this in the request to your server.'
    //   );
    User.find({phoneNumber: req.body.From}, (err, docs) => {
      if (err) console.log(err);
      docs.forEach(user => {
        Appointment.find({_id: user.apptReminderId}, (err2, appts) => {
          if (err2) console.log(err);
          appts.forEach(appt => {
            const twiml = new MessagingResponse();
            if (appt.reminder === "Sent Reminder") {
              if (req.body.Body === "YES") {
                appt.reminder = "Confirmed"
                twiml.message("Appointment confirmed!");
              }
              else if (req.body.Body === "NO") {
                appt.reminder = "Cancelled"
                twiml.message("Appointment cancelled");
              }
              else {
                twiml.message("I didn't understand your response");
              }
              appt.save();
              res.writeHead(200, {'Content-Type': 'text/xml'});
              res.end(twiml.toString());
            }
          })
        })
      })
    })
    
    

    
  }