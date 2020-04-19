import "date-fns";
import React, { useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  Calendar
} from "@material-ui/pickers";
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge'
import axios from 'axios'

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

const CalendarPage = (props) => {
  const [date, setDate] = useState(new Date());
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    axios.get('/appointment').then(response => setAppointmentList(response.data));
  }, [props.updated]);
  return (
    <ThemeProvider theme={theme}>
      <br />
      <br />
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
        {appointmentList.map(appt => (new Date(appt.startTime)).getDate() == date.getDate() && (new Date(appt.startTime)).getMonth() == date.getMonth() && (new Date(appt.startTime)).getFullYear() == date.getFullYear() ? 
          <div>
          <Card variant="outlined">
          <CardContent>
              <Typography variant="h6">
              {appt.doctor}, at {appt.location}
              </Typography>
              <Typography color="textSecondary">
                  {(new Date(appt.startTime)).toLocaleDateString()}: {(new Date(appt.startTime)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} to {(new Date(appt.endTime)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Typography>
              <Typography variant="body2" component="p">
                {appt.description}
              </Typography>
          </CardContent>
          </Card>
          <br/>
          </div> : null
        )}
      </Grid>
    </Grid>
    </Container>
    
    </ThemeProvider>
  );
}

export default CalendarPage;