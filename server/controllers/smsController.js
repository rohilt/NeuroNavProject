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
         body: req.body.body,
         from: '+13345819814',
         to: '+18133732574'
       })
      .then(message => res.send(message));
    }
    catch (err) {
      res.send(err);
    }
  }