import React, {useState, useEffect} from 'react';
import AddPatient from '../components/Admin/AddPatient';
import AddAppointment from '../components/Admin/AddAppointment';
import PatientList from '../components/Admin/PatientList';
import AppointmentList from '../components/Admin/AppointmentList';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';


const Admin = () => {
        const [value, setValue] = useState(0);
        const [updated, setUpdated] = useState(0);
        return (
                <div>
                <Paper>
                        <Tabs value={value} onChange={(e, newValue) => {setValue(newValue)}} indicatorColor="primary" textColor="primary" centered>
                                <Tab label="Patients"/>
                                <Tab label="Appointments"/>
                        </Tabs>
                </Paper>
                {value == 0 ? <div><AddPatient updated={updated} setUpdated={setUpdated}/> <PatientList updated={updated}/></div> : null}
                {value == 1 ? <div><AddAppointment updated={updated} setUpdated={setUpdated}/><AppointmentList updated={updated}/></div> : null}
                </div>
        )
}

export default Admin;
