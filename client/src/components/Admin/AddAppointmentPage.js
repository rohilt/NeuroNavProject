import React, {useState, useEffect} from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import TimeIcon from '@material-ui/icons/Timer'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import httpUser from '../../httpUser';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(25),
    marginRight: theme.spacing(-4),
  },
  snackbar: {
    marginLeft: theme.spacing(28)
  }
}));

const AddPatientPage = (props) => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [patientList, setPatientList] = useState([]);
  const [description, setDescription] = useState("");
  const [patientSelected, setPatientSelected] = useState("");
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [location, setLocation] = useState("");

  const locationList = [
    {location: 'Norman Fixel Institute'},
    {location: 'Neuromedicine Hospital'}
  ]
 


  useEffect(() => {
    axios.get('/patient').then(response => {
      setPatientList(response.data);
    });
    
  }, [props.updated]);


  const handleSubmit = () => {
    console.log(new Date().toLocaleDateString())
    console.log(new Date(date))

    let startDate = new Date(date);
    startDate.setHours(time.getHours(), time.getMinutes());
    // console.log(startDate);
    let endDate = new Date(date);
    // console.log(endDate);
    endDate.setHours(endTime.getHours(), endTime.getMinutes());
    // console.log(endDate);
    // console.log('/appointment?startTime=' + startDate.toISOString() + '&endTime=' + endDate.toISOString() + '&patientId=' + patientSelected + '&patientName=' + patientName + '&description=' + description);
    axios.post('/appointment?startTime=' + startDate.toISOString() + '&endTime=' + endDate.toISOString() + '&patientId=' + patientSelected + '&patientName=' + patientName + '&description=' + description + '&doctor=' + doctor + '&location=' + location);
    // axios.post('/patient?name=' + name + '&middleInitial=' + mi + '&lastName=' + lastName + '&dateOfBirth=' + dob.toISOString() + '&phoneNumber=' + phone + '&emailAddress=' + email + '&address=' + address).then(response => console.log(response));
    props.setUpdated(props.updated+1);
    setDate(new Date());
    setTime(new Date());
    setEndTime(new Date());
    setDescription("");
    setDoctor("");
    setShowAlert(true);
  };
  return (
    <main className={classes.content}>
    <Container>
      <br/>
    <Paper>
      <DialogTitle>Add a new appointment</DialogTitle>
      <Container>
      <Autocomplete options={patientList} getOptionLabel={(patient) => (patient.name + ' ' + patient.lastName)} style={{width: 400}} renderInput={(params) => <TextField {...params} label="Select Patient" variant="standard" />}
      onChange={(event, value) => {
        if (!value) {
          setPatientName("");
          setPatientSelected("");
        }
        else {
          setPatientName(value.name + ' ' + value.lastName);
          setPatientSelected(value._id);
        }
      }}>

      </Autocomplete>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="Date of Appointment"
          value={date}
          onChange={(date) => setDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          keyboardIcon={<TimeIcon/>}
          variant="inline"
          margin="normal"
          label="Start Time"
          value={time}
          onChange={(time) => setTime(time)}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          keyboardIcon={<TimeIcon/>}
          variant="inline"
          margin="normal"
          label="End Time"
          value={endTime}
          onChange={(time) => setEndTime(time)}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </MuiPickersUtilsProvider>
      {/* <TextField fullWidth margin="dense" value={location} onChange={(e) => setLocation(e.target.value)} label="Location"/> */}
      <Autocomplete options={locationList} getOptionLabel={(location) => location.location} style={{width: 400}} renderInput={(params) => <TextField {...params} label="Select Location" variant="standard" />}
      onChange={(event, value) => {
        if (!value) {
          setLocation("");
          
        }
        else {
          setLocation(value.location);
          
        }
      }}>

      </Autocomplete>
      <TextField style={{width: 400}} margin="dense" value={doctor} onChange={(e) => setDoctor(e.target.value)} label="Doctor"/>
      <TextField fullWidth margin="dense" value={description} onChange={(e) => setDescription(e.target.value)} label="Description"/>
      </Container>
      <DialogActions>
        <Button onClick={handleSubmit}>Add appointment</Button>
      </DialogActions>
    </Paper>
    <Snackbar className={classes.snackbar} 
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',}} 
              open={showAlert} 
              autoHideDuration={5000} 
              onClose={() => setShowAlert(false)}>
      <Alert severity="success">
        Appointment added to database
      </Alert>
    </Snackbar>
    </Container>
    </main>
  )
}

export default AddPatientPage;