import React from 'react';
import Clinic from "./Map";
import Garage from "./Map2";
import { Button, Container, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

// import NavBar from "../../views/Home/NavBar2"
import './Directions.css'




function Directions() {
    return (
       
        <div className="Wrapper">
        <Container maxWidth="md">

        {/* <div className="Garage" style={{display: 'flex',  justifyContent:'left', height: '100vh'}}> */}
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6}>
        <Garage/>
        </Grid>
        {/* </div> */}
        

        {/* <div className="Clinic" style={{display: 'flex',  justifyContent:'right', height: '100vh'}}> */}
        <Grid item xs={12} sm={6} md={6}>
        <Clinic/> 
        </Grid>
        </Grid>
        {/* </div> */}
        </Container>


        </div>
        
        
    );
}

export default Directions;