import React, {useState} from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddAppointment = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
    <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>Add appointment</Button>
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Add a new appointment</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Name" fullWidth/>
        <TextField margin="dense" type="datetime-local" InputLabelProps={{shrink: true}} label="Date and Time" fullWidth/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Add appointment</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default AddAppointment;