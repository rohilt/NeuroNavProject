const axios = require('axios')
const mongoose = require('mongoose')
const Patient = require('../models/user.js')

exports.getDirections = async (req, res) => {
  
  try {
    Patient.findOne({name: req.query.name}, async (err, listing) => {
      
      
      if (err) throw err;
      const origin = req.query.origin;
      const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json?key=' + (process.env.MAP_KEY || require('../config/config.js').directions.key) + '&origin=' + origin + '&destination=Parking Garage 10 Newell Dr, Gainesville, FL 32603');
      // console.log(response.data);
      // res.send(response.data);
      res.send({
        distance: response.data.routes[0].legs[0].distance.text,
        duration: response.data.routes[0].legs[0].duration.text
      });
    })
  }
  catch (err) {
    console.log(err);
  }
}