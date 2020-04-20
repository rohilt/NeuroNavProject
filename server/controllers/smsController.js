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
    message.body('If you have any questions or concerns regarding your upcoming appointment with the UF Neurosurgery Department please call 352-273-9000.');
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }