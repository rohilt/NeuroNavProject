import React, {useState} from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
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

const AddPatientPage = (props) => {
  const [name, setName] = useState("");
  const [mi, setMi] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleSubmit = () => {
    axios.post('/patient?name=' + name + '&middleInitial=' + mi + '&lastName=' + lastName + '&dateOfBirth=' + dob.toISOString() + '&phoneNumber=' + phone + '&emailAddress=' + email + '&address=' + address).then(response => console.log(response));
    props.setUpdated(props.updated+1);
    setName("");
    setMi("");
    setLastName("");
    setDob(new Date());
    setPhone("");
    setEmail("");
    setAddress("");
    setShowAlert(true);
  };
  return (
    <Container>
      <br/>
    <Paper>
      <DialogTitle>Add a new patient</DialogTitle>
      <Container>
        <TextField margin="dense" value={name} onChange={(e) => setName(e.target.value)} label="First Name" />
        <TextField margin="dense" value={mi} onChange={(e) => setMi(e.target.value)} label="Middle Initial" />
        <TextField margin="dense" value={lastName} onChange={(e) => setLastName(e.target.value)} label="Last Name" />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            fullWidth
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date of birth"
            value={dob}
            onChange={(date) => setDob(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField margin="dense" value={phone} onChange={(e) => setPhone(e.target.value)} label="Phone Number" fullWidth/>
        <TextField margin="dense" value={email} onChange={(e) => setEmail(e.target.value)}label="Email Address" fullWidth/>
        <TextField margin="dense" value={address} onChange={(e) => setAddress(e.target.value)}label="Address" fullWidth/>
      </Container>
      <DialogActions>
        <Button onClick={handleSubmit}>Add patient</Button>
      </DialogActions>
    </Paper>
    <Snackbar anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
    }} open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}>
      <Alert severity="success">
        Patient added to database
      </Alert>
    </Snackbar>
    </Container>
  )
}

export default AddPatientPage;