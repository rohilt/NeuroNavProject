import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { TableContainer, Container, DialogActions} from '@material-ui/core';
import MaterialTable from "material-table";
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



const AppointmentList = (props) => {
  const classes = useStyles();
  const [appointmentList, setAppointmentList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [number, setNumber] =useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get('/appointment').then(response => setAppointmentList(response.data));
  }, [props.updated]);
  return (
    <main className={classes.content}>
    <Container fullWidth maxWidth="xl">
    <TableContainer component={Paper}>
    <MaterialTable columns={[
        {title: "Patient", field: "patientName"},
        {title: "Date", field: "startTime", render: rowData => (new Date(rowData.startTime)).toLocaleDateString()},
        {title: "Start Time", field: "startTime", render: rowData => (new Date(rowData.startTime)).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'})},
        {title: "End Time", field: "endTime", render: rowData => (new Date(rowData.endTime)).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'})},
        {title: "Doctor", field: "doctor"},
        {title: "Location", field: "location"},
        {title: "Description", field: "description"},
        {title: "Reminder", field: "reminder"}
      ]}
      actions={[
        {
          icon: 'message',
          tooltip: 'Remind patient',
          onClick: (event, rowData) => {
            setUser(rowData);
            setMessage(rowData.patientName + ', you have an upcoming appointment.');
            setOpen(true);
            axios.get('/patient').then(response => {

              const result =  response.data.filter(patient=> 
                patient.name + ' ' + patient.lastName== rowData.patientName
                )
              
              console.log(rowData.patientName)
              setNumber(result[0].phoneNumber)
              console.log(result[0].phoneNumber)


      });
          }
        }
      ]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            axios.put("/appointment", {newData});
            setTimeout(() => {
                {
                  props.setUpdated(props.updated + 1); 
                }
                resolve();
            }, 1000);
        }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            axios.delete("/appointment?id=" + oldData._id);
            setTimeout(() => {
                {
                  props.setUpdated(props.updated + 1); 
                }
                resolve();
            }, 1000);
        })
      }}
      title="Appointments Database"
      data={appointmentList}
      />
      {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointmentList.map(entry => (
            <TableRow key={entry._id}>
              <TableCell>{entry.patientName}</TableCell>
              <TableCell>{entry.startTime}</TableCell>
              <TableCell>{entry.endTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </TableContainer>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Send a reminder</DialogTitle>
      <DialogContent>
      <DialogContentText>
        Enter the message to send to the patient below. 
      </DialogContentText>
        <TextField autofocus margin="dense" multiline fullWidth maxWidth={'sm'} value={message} onChange={(e) => setMessage(e.target.value)} label="Message"/>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => {
          setOpen(false);
          setUser({});
          setMessage("");
          fetch('/text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({body: message, to: number})
          }).then((res) => setShowAlert(true));
        }}>Send</Button>
      </DialogActions>
    </Dialog>
    <Snackbar className={classes.snackbar} 
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',}} 
              open={showAlert} 
              autoHideDuration={5000} 
              onClose={() => setShowAlert(false)}>
      <Alert severity="success">
        Message sent!
      </Alert>
    </Snackbar>
    </Container>
    </main>
  )
}

export default AppointmentList;