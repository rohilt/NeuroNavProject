import React, {useState} from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const AddPatient = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const handleSubmit = () => {
    axios.post('/patient?name=' + name + '&emailAddress=' + email + '&address=' + address).then(response => console.log(response));
    props.setUpdated(props.updated+1);
    setOpenDialog(false);
  };
  return (
    <div>
    <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>Add patient</Button>
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Add a new patient</DialogTitle>
      <DialogContent>
        <TextField margin="dense" value={name} onChange={(e) => setName(e.target.value)} label="Name" fullWidth/>
        <TextField margin="dense" value={email} onChange={(e) => setEmail(e.target.value)}label="Email Address" fullWidth/>
        <TextField margin="dense" value={address} onChange={(e) => setAddress(e.target.value)}label="Address" fullWidth/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Add patient</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default AddPatient;