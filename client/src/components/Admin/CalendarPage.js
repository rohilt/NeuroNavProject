import "date-fns";
import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  Calendar
} from "@material-ui/pickers";
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'


const CalendarPage = (props) => {
  const [date, setDate] = useState(new Date());
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    axios.get('/appointment').then(response => setAppointmentList(response.data));
  }, [props.updated]);
  return (
    <Container fullWidth maxWidth="sm" component={Paper}>
      <br/>
      <br/>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Calendar
          date={date}
          onChange={(date) => setDate(date)}
        />
      </MuiPickersUtilsProvider>
      
    </Container>
  );
}

export default CalendarPage;