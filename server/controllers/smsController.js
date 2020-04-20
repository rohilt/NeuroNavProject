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

  exports.receiveText = (req, res) => {
    console.log(req)
    const twiml = new MessagingResponse();
    const message = twiml.message();
    message.body(`Incoming message from ${req.body.From}: ${req.body.Body}`);
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
    
    

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }