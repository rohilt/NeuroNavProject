import React, {useState, useEffect} from 'react';
import AddPatient from '../components/Admin/AddPatient';
import AddAppointment from '../components/Admin/AddAppointment';
import PatientList from '../components/Admin/PatientList';
import AppointmentList from '../components/Admin/AppointmentList';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
      }));


const Admin = () => {
        const classes = useStyles();
        const [value, setValue] = useState(0);
        const [updated, setUpdated] = useState(0);
        return (
                <div>

                <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6"  className={classes.title} >Admin View</Typography>
                    
                    <Button component={Link} to="/login" color="inherit">Logout</Button>
                </Toolbar>
                <Tabs value={value} onChange={(e, newValue) => {setValue(newValue)}} indicatorColor="primary" textColor="inherit" centered>
                                <Tab label="Patients"/>
                                <Tab label="Appointments"/>
                        </Tabs>
                

            </AppBar>
 
                {value == 0 ? <div><AddPatient updated={updated} setUpdated={setUpdated}/> <PatientList updated={updated}/></div> : null}
                {value == 1 ? <div><AddAppointment updated={updated} setUpdated={setUpdated}/><AppointmentList updated={updated}/></div> : null}
                </div>
        )
}

export default Admin;
