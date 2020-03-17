import React from 'react';
import Clinic from "./Map";
import Garage from "./Map2";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Directions.css'



function Directions() {
    return (
       
        <div className="Wrapper">

        {/* <Button component={Link} to="/admin" variant="outlined" color="primary">Logout</Button> */}

        <div>
        <Button component={Link} to="/patientView" variant="contained" color="primary">Back</Button>
            </div>



        <div className="Garage" style={{display: 'flex',  justifyContent:'right', height: '100vh'}}>
        <Garage/>
        </div>
        
        <div className="Clinic" style={{display: 'flex',  justifyContent:'left', height: '100vh'}}>
        <Clinic/> 
        </div>

        </div>
        
        
    );
}

export default Directions;