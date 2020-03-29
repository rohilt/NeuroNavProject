const axios = require('axios')
const mongoose = require('mongoose')
const config = require('../config/config.js')

const accountSid = config.texting.accountSid;
const authToken = config.texting.authToken;
const client = require('twilio')(accountSid, authToken);

  exports.sendText = async (req, res) => {
    try {
      client.messages
      .create({
         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
         from: '+13345819814',
         to: '+15072501199'
       })
      .then(message => res.send(message));
    }
    catch (err) {
      res.send(err);
    }
  }