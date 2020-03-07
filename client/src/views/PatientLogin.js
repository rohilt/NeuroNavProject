import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const PatientLogin = () => {
        return (
                <div>
                        This is the login page <br />
                        <Button component={Link} to="/patientview" variant="outlined" color="primary">Login</Button>
                </div>
        )
                        
}

export default PatientLogin;
