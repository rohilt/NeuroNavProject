const axios = require('axios')
const mongoose = require('mongoose')

const accountSid = process.env.TWILIO_ACCOUNT_SID || require('../config/config.js').texting.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN || require('../config/config.js').texting.authToken;
const client = require('twilio')(accountSid, authToken);

  exports.sendText = async (req, res) => {
    try {
      client.messages
      .create({
         body: req.body.body,
         from: '+13345819814',
         to: req.body.to 
       })
      .then(message => res.send(message));
    }
    catch (err) {
      res.send(err);
    }
  }