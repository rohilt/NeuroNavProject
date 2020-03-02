import React from 'react';
import Clinic from "./Map";
import Garage from "./Map2";
import './Directions.css'



function Directions() {
    return (
        <div className = "background">
        <div className="Wrapper">
        
        <div className="Clinic" style={{display: 'flex',  justifyContent:'left', height: '100vh'}}>
        <Clinic/> 
        </div>


        <div className="Garage" style={{display: 'flex',  justifyContent:'right', height: '100vh'}}>
        <Garage/>
        </div>

        </div>
        </div>
        
    );
}

export default Directions;