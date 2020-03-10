import React, {useState} from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


const AddAppointment = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const handleSubmit = () => {
    axios.post('/appointment?name=' + name + '&date=' + time).then(response => console.log(response));
    props.setUpdated(props.updated+1);
    setOpenDialog(false);
    setName("");
    setTime("");
  };
  return (
    <div>
    <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>Add appointment</Button>
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Add a new appointment</DialogTitle>
      <DialogContent>
        <TextField margin="dense" value={name} onChange={(e) => setName(e.target.value)} label="Name" fullWidth/>
        <TextField margin="dense" value={time} onChange={(e) => setTime(e.target.value)} type="datetime-local" InputLabelProps={{shrink: true}} label="Date and Time" fullWidth/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Add appointment</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default AddAppointment;