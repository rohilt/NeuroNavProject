import "date-fns";
import React, { useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles"
import MessageIcon from '@material-ui/icons/Message';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  Calendar
} from "@material-ui/pickers";
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import NotesIcon from '@material-ui/icons/Notes';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import Badge from '@material-ui/core/Badge'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import FeedbackIcon from '@material-ui/icons/Feedback';
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { CardActionArea, CardActions } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 14,
  },
});
const numDaysBetween = (d1, d2) => {
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return (d1.getTime() - d2.getTime())/86400000;
}

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

const CalendarPage = (props) => {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const [appointmentList, setAppointmentList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [number, setNumber] =useState("");
  useEffect(() => {
    axios.get('/appointment').then(response => {
      setAppointmentList(response.data);
    });
  }, [props.updated]);
  return (
    <main className={classes.content}>
    <ThemeProvider theme={theme}>
      <br />
      <br />
    <Container fullWidth maxWidth="md" component={Paper}>
      <Grid spacing={3} container>
        <Grid item xs>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Calendar fullWidth
          date={date}
          renderDay={(date, selectedDay, dayInCurrentMonth, dayComponent) => 
            appointmentList.some((appt) => numDaysBetween(new Date(appt.startTime), date) == 0) ? (<Badge color="primary" variant="dot" overlap="circle">{dayComponent}</Badge>) : <div>{dayComponent}</div>
          }
          onChange={(date) => setDate(date)}
        />
      </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs>
        {appointmentList.sort((appt1, appt2) => (new Date(appt1.startTime)) < (new Date(appt2.startTime)) ? -1 : ((new Date(appt1.startTime)) > (new Date(appt2.startTime)) ? 1 : 0)).map(appt => (new Date(appt.startTime)).getDate() == date.getDate() && (new Date(appt.startTime)).getMonth() == date.getMonth() && (new Date(appt.startTime)).getFullYear() == date.getFullYear() ? 
          <div>
          <Card variant="outlined">
          <CardContent>
              <Typography variant="h5">
              {appt.patientName}
              </Typography>
              <Typography color="textSecondary">
                <List dense>
                  <ListItem><ListItemIcon><AccessTimeIcon/></ListItemIcon><ListItemText primary={(new Date(appt.startTime)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + " to " + (new Date(appt.endTime)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}/></ListItem>
                  <ListItem><ListItemIcon><LocationOnIcon/></ListItemIcon><ListItemText primary={appt.location}/></ListItem>
                  <ListItem><ListItemIcon><PersonPinIcon/></ListItemIcon><ListItemText primary={appt.doctor}/></ListItem>
                  <ListItem><ListItemIcon><FeedbackIcon/></ListItemIcon><ListItemText primary={appt.reminder}/></ListItem>
                  <ListItem><ListItemIcon><NotesIcon/></ListItemIcon><ListItemText primary={appt.description}/></ListItem>
                </List>
              </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" disableElevation variant="contained" color="primary" startIcon={<MessageIcon/>} onClick={
              () => {
                setMessage(appt.patientName + ', you have an upcoming appointment.');
                setOpen(true);
                axios.get('/patient').then(response => {
    
                  const result =  response.data.filter(patient=> 
                    patient.name + ' ' + patient.lastName== appt.patientName
                    );
                  
                  setNumber(result[0].phoneNumber);
                })
              }}> Remind </Button>
          </CardActions>
          </Card>
          <br/>
          </div> : null
        )}
      </Grid>
    </Grid>
    </Container>
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
    </ThemeProvider>
    </main>
  );
}

export default CalendarPage;