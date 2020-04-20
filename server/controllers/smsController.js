const axios = require('axios')
const mongoose = require('mongoose')

const accountSid = process.env.TWILIO_ACCOUNT_SID || require('../config/config.js').texting.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN || require('../config/config.js').texting.authToken;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;


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

  exports.receiveText = async (req, res) => {
    const twiml = new MessagingResponse();
    const message = twiml.message();
    message.body(req.body.from + ' ' + req.body.body);
    message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }