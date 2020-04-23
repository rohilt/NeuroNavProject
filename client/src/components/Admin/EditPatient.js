import React, {useState} from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import httpUser from '../../httpUser'

const EditPatient = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [authLevel, setauthLevel] = useState("");
  var person = {name: "", email: "", address: "", password:"", authLevel: ""};
  const handleSubmit = () => {
    setauthLevel("patient");
        person.name = name;
        person.email = email;
        person.address = address;
        person.password = password;
        person.authLevel = "patient";
       const user = httpUser.signUp(person);
        props.setUpdated(props.updated+1);
        setOpenDialog(false);
        setName("");
        setEmail("");
        setAddress("");
      };
  return (
    <div>
    <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>Add patient</Button>
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <TextField margin="dense" value={name} onChange={(e) => setName(e.target.value)} label="Name" fullWidth/>
        <TextField margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" fullWidth/>
        <TextField margin="dense" value={address} onChange={(e) => setAddress(e.target.value)} label="Address" fullWidth/>
        <TextField margin="dense" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" fullWidth/>
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleSubmit}>Submit</Button>
      </DialogActions>

    </Dialog>
    </div>
  )
}

export default EditPatient;