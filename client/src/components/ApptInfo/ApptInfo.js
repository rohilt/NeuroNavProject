import React, {useState, useEffect} from 'react';
import Appt from './Appt';
import './ApptInfo.css'
import httpUser from '../../httpUser'
import axios from 'axios'

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      minWidth: 275,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
  }));

function ApptInfo(props) {
    const classes = useStyles();
    const user = httpUser.getCurrentUser();
    const [appointmentList, setAppointmentList] = useState([]);
    useEffect(() => {
      axios.get('/appointment').then(response => {
        setAppointmentList(response.data.filter(element => element.patientId == user._id));
        // setAppointmentList(appointmentList.filter(element => element.patientId == user._id));
      });
    }, [props.updated]);

    const numDaysBetween = (d1, d2) => {
      d1.setHours(0, 0, 0, 0);
      d2.setHours(0, 0, 0, 0);
      console.log(d1);
      console.log(d2);
      console.log((d1.getTime() - d2.getTime())/86400000);
      return (d1.getTime() - d2.getTime())/86400000;
    }
    return (
        
            <div className="Wrapper">
                <Toolbar>
                <Typography variant="h6"  className={classes.title} >Upcoming Appointment Information</Typography>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    component={Link} to="./viewAll"
                >
                View All
                </Button>
                </Toolbar>

                <div className = "ApptBlock">
                    <h2>Today:</h2>
                    {appointmentList.map(
                      element => numDaysBetween(new Date(element.startTime), new Date()) == 0 ?
                      <Appt start={element.startTime} end={element.endTime} description={element.description} /> : null
                    )}
                </div>

                <div className="ApptBlock">
                    <h2>Tomorrow:</h2>
                    {appointmentList.map(
                      element => numDaysBetween(new Date(element.startTime), new Date()) == 1  ?
                      <Appt start={element.startTime} end={element.endTime} description={element.description} /> : null
                    )}
                </div>

                <div className="ApptBlock">
                    <h2>This Week:</h2>
                    {appointmentList.map(
                      element => numDaysBetween(new Date(element.startTime), new Date()) >= 2 && numDaysBetween(new Date(element.startTime), new Date()) <= 7 ?
                      <Appt start={element.startTime} end={element.endTime} description={element.description} /> : null
                    )}
                </div>

                <div className="ApptBlock">
                    <h2>Later This Year:</h2>
                    {appointmentList.map(
                      element => numDaysBetween(new Date(element.startTime), new Date()) > 7 ?
                      <Appt start={element.startTime} end={element.endTime} description={element.description} /> : null
                    )}
                </div>
            </div>
        
    );
}

export default ApptInfo;