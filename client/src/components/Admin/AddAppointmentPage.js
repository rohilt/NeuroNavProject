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

const AddPatientPage = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [patientList, setPatientList] = useState([]);
  const [description, setDescription] = useState("");
  const [patientSelected, setPatientSelected] = useState("");
  const [patientName, setPatientName] = useState("");
  useEffect(() => {
    axios.get('/patient').then(response => {
      setPatientList(response.data);
    });
  }, [props.updated]);
  const handleSubmit = () => {
    let startDate = new Date(date);
    startDate.setHours(time.getHours(), time.getMinutes());
    // console.log(startDate);
    let endDate = new Date(date);
    // console.log(endDate);
    endDate.setHours(endTime.getHours(), endTime.getMinutes());
    // console.log(endDate);
    // console.log('/appointment?startTime=' + startDate.toISOString() + '&endTime=' + endDate.toISOString() + '&patientId=' + patientSelected + '&patientName=' + patientName + '&description=' + description);
    axios.post('/appointment?startTime=' + startDate.toISOString() + '&endTime=' + endDate.toISOString() + '&patientId=' + patientSelected + '&patientName=' + patientName + '&description=' + description);
    // axios.post('/patient?name=' + name + '&middleInitial=' + mi + '&lastName=' + lastName + '&dateOfBirth=' + dob.toISOString() + '&phoneNumber=' + phone + '&emailAddress=' + email + '&address=' + address).then(response => console.log(response));
    props.setUpdated(props.updated+1);
    setShowAlert(true);
  };
  return (
    <Container>
      <br/>
    <Paper>
      <DialogTitle>Add a new appointment</DialogTitle>
      <Container>
      <Autocomplete options={patientList} getOptionLabel={(patient) => patient.name} style={{width: 400}} renderInput={(params) => <TextField {...params} label="Select Patient" variant="standard" />}
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
      <TextField fullWidth margin="dense" value={description} onChange={(e) => setDescription(e.target.value)} label="Description"/>
      </Container>
      <DialogActions>
        <Button onClick={handleSubmit}>Add appointment</Button>
      </DialogActions>
    </Paper>
    <Snackbar anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
    }} open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}>
      <Alert severity="success">
        Appointment added to database
      </Alert>
    </Snackbar>
    </Container>
  )
}

export default AddPatientPage;