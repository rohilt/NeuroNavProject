const db = require('../controllers/databaseController.js'),
    directions = require('../controllers/directionsController.js'),
    sms = require('../controllers/smsController.js')
    express = require('express'), 
    router = express.Router()

router.post('/patient', db.addPatient);
router.post('/appointment', db.addAppointment);
router.get('/patient', db.getPatients);
router.get('/appointment', db.getAppointments);
router.get('/directions', directions.getDirections);
router.post('/text', sms.sendText);
router.get('/calendar', db.viewCalendarEvents);
router.post('/calendar', db.addCalendarEvent);
router.delete('/patient', db.deletePatient);
router.put('/patient', db.editPatient);
router.delete('/appointment', db.deleteAppointment);
router.put('/appointment', db.editAppointment);
router.get('/calendarId', db.getCalendarId);
router.post('/calendarId', db.setCalendarId);
  
module.exports = router;