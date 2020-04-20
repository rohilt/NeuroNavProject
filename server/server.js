const express = require('./config/express.js')
const router = require('./routes/examples.server.routes.js')
const cron = require('node-cron')
const mongoose = require('mongoose')
const Appointment = require('./models/AppointmentModel.js')
const User = require('./models/user.js')
userRouter = require('./routes/users.js');

const accountSid = process.env.TWILIO_ACCOUNT_SID || require('./config/config.js').texting.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN || require('./config/config.js').texting.authToken;
const client = require('twilio')(accountSid, authToken);
 
// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()
app.locals.calendarId = 'primary';
app.use('/api/users', userRouter);

cron.schedule('* * * * *', () => {
  Appointment.find({}, (err, docs) => {
    if (err) console.log(err);
    docs.forEach(async (doc) => {
      User.find({ _id: doc.patientId}, (err, users) => {
        if (err) console.log(err);
          users.forEach(async (patient) => {
            if ((new Date(doc.startTime)).getTime() - (new Date()).getTime() <= 86400000 && (new Date(doc.startTime)).getTime() - (new Date()).getTime() >= 0) {
              if (doc.reminder != "Sent") {
                doc.reminder = "Sent";
                patient.apptReminderId = doc._id;
                console.log(patient);
                doc.save();
                patient.save();
                  console.log(docs);
                  try {
                    client.messages
                    .create({
                      body: "You have an upcoming appointment, reply YES to confirm or NO to indicate you cannot go",
                      from: '+13345819814',
                      to: patient.phoneNumber
                    })
                    .then(message => console.log("Message sent!"));
                  }
                  catch (err) {
                    console.log("Error: message not sent")
                  }
                }
              }
          });
        })
      })
    });
  });
      
app.listen(port, () => console.log(`Server now running on port ${port}!`));
// app.use(router);