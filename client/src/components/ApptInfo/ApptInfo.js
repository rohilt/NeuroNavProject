import React, {useState, useEffect} from 'react';
import Appt from './Appt';
import PatientAppointmentList from '../PatientAppointments/PatientAppointmentList'
import './ApptInfo.css'
import httpUser from '../../httpUser'
import axios from 'axios'

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'; 
import IconButton from '@material-ui/core/IconButton'; 
import Container from '@material-ui/core/Container'; 
import Divider from '@material-ui/core/Divider'; 
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableChartIcon from '@material-ui/icons/TableChart';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import { Paper } from '@material-ui/core';



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
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    }
  }));

function ApptInfo(props) {
    const classes = useStyles();
    const user = httpUser.getCurrentUser();
    const [appointmentList, setAppointmentList] = useState([]);
    const [openTable, setOpenTable] = useState(false);
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
                <Dialog
                  fullScreen={navigator.userAgent.match(/Android/) || navigator.userAgent.match(/iPhone/) || navigator.userAgent.match(/iPad/)}
                  fullWidth
                  maxWidth={'lg'}
                  open={openTable}
                  onClose={() => setOpenTable(false)}
                >
                  <DialogTitle>
                  Viewing {user.name}'s appointments
                  <IconButton onClick={() => setOpenTable(false)} variant="outlined" className={classes.closeButton}><CloseIcon/></IconButton>
                  </DialogTitle>
                  <PatientAppointmentList/>
                </Dialog>
                <Container maxWidth="lg" elevation={0} component={Paper} disableGutters>
                <div className = "ApptBlock">
                  <div align="right">
                <Button
                    disableElevation
                    variant="outlined"
                    startIcon={<TableChartIcon/>}
                    color="primary"
                    onClick={() => setOpenTable(true)}
                >
                View All
                </Button>
                </div>
                  <br/>
                    <Typography variant="h4">
                      Today
                    </Typography>
                    {appointmentList.map(
                      element => numDaysBetween(new Date(element.startTime), new Date()) == 0 ?
                      <Appt start={element.startTime} end={element.endTime} description={element.description} doctor={element.doctor} location={element.location}/> : null
                    )}
                </div>
                <Divider />

                <div className="ApptBlock">
                    <Typography variant="h4">
                      Tomorrow
                    </Typography>
                  <br/>
                    {appointmentList.map(
                      element => numDaysBetween(new Date(element.startTime), new Date()) == 1  ?
                      <Appt start={element.startTime} end={element.endTime} description={element.description} doctor={element.doctor} location={element.location}/> : null
                    )}
                </div>
                <Divider />

                <div className="ApptBlock">
                    <Typography variant="h4">
                      This week
                    </Typography>
                  <br/>
                    {appointmentList.map(
                      element => numDaysBetween(new Date(element.startTime), new Date()) >= 2 && numDaysBetween(new Date(element.startTime), new Date()) <= 7 ?
                      <Appt start={element.startTime} end={element.endTime} description={element.description} doctor={element.doctor} location={element.location}/> : null
                    )}
                </div>
                <Divider />

                <div className="ApptBlock">
                    <Typography variant="h4">
                      Later this year
                    </Typography>
                  <br/>
                    {appointmentList.map(
                      element => numDaysBetween(new Date(element.startTime), new Date()) > 7 && numDaysBetween(new Date(element.startTime), new Date()) <= 365 ?
                      <div> <Appt start={element.startTime} end={element.endTime} description={element.description} doctor={element.doctor} location={element.location}/> <br/> </div> : null
                    )}
                </div>
                </Container>
            </div>
        
    );
}

export default ApptInfo;