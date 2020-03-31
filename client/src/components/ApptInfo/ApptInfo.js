import React from 'react';
import Appt from './Appt';
import './ApptInfo.css'

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

function ApptInfo() {
    const classes = useStyles();

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
                    <Appt/>
                </div>

                <div className="ApptBlock">
                    <h2>Tomorrow:</h2>
                    <p>No Appointments to show!</p>
                </div>

                <div className="ApptBlock">
                    <h2>Later This Year:</h2>
                    <Appt/>
                    <Appt/>
                </div>
            </div>
        
    );
}

export default ApptInfo;