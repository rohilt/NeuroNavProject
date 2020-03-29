import React, {useState} from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const AddPatientPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleSubmit = () => {
    axios.post('/patient?name=' + name + '&emailAddress=' + email + '&address=' + address).then(response => console.log(response));
    props.setUpdated(props.updated+1);
    setName("");
    setEmail("");
    setAddress("");
    setShowAlert(true);
  };
  return (
    <Container>
      <br/>
    <Paper>
      <DialogTitle>Add a new patient</DialogTitle>
      <DialogContent>
        <TextField margin="dense" value={name} onChange={(e) => setName(e.target.value)} label="Name" fullWidth/>
        <TextField margin="dense" value={email} onChange={(e) => setEmail(e.target.value)}label="Email Address" fullWidth/>
        <TextField margin="dense" value={address} onChange={(e) => setAddress(e.target.value)}label="Address" fullWidth/>
      </DialogContent>
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