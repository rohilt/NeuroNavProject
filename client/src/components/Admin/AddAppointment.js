import React, {useState, useEffect} from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


const AddAppointment = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [patientList, setPatientList] = useState([]);
  const [patientSelected, setPatientSelected] = useState("");
  const [patientName, setPatientName] = useState("");
  const handleSubmit = () => {
    axios.post('/appointment?patientId=' + patientSelected + '&patientName=' + patientName + '&start=' + time + '&end=' + endTime).then(response => console.log(response));
    props.setUpdated(props.updated+1);
    setOpenDialog(false);
    setName("");
    setTime("");
    setEndTime("");
    setPatientSelected("");
  };
  useEffect(() => {
    axios.get('/patient').then(response => setPatientList(response.data));
  }, []);
  return (
    <div>
      
    <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>Add appointment</Button>
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Add a new appointment</DialogTitle>
      <DialogContent>
        <Select value={patientName} onChange={(event) => {setPatientSelected(event.target.value._id); setPatientName(event.target.value.name)}} fullWidth>
          {patientList.map(patient => (
            <MenuItem key={patient._id} value={patient}>{patient.name}</MenuItem>
          ))}
        </Select>
        <TextField margin="dense" value={time} onChange={(e) => setTime(e.target.value)} type="datetime-local" InputLabelProps={{shrink: true}} label="Start time" fullWidth/>
        <TextField margin="dense" value={endTime} onChange={(e) => setEndTime(e.target.value)} type="datetime-local" InputLabelProps={{shrink: true}} label="End time" fullWidth/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Add appointment</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default AddAppointment;