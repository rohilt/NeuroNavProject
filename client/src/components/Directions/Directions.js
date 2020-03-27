import React from 'react';
import Clinic from "./Map";
import Garage from "./Map2";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import NavBar from "../../views/Home/NavBar2"
import './Directions.css'




function Directions() {
    return (
       
        <div className="Wrapper">
        <NavBar />

        <div className="Garage" style={{display: 'flex',  justifyContent:'left', height: '100vh'}}>
        <Garage/>
        </div>
        
        <div className="Clinic" style={{display: 'flex',  justifyContent:'right', height: '100vh'}}>
        <Clinic/> 
        </div>

        </div>
        
        
    );
}

export default Directions;