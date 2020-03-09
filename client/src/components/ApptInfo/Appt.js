import React from 'react';
import './ApptInfo.css'



function Appt(){
    return(
        <div className = "Appt">
            <h2>Test Appointment with Dr. Sapperstein</h2>
            <h3>Monday, March 9th 3:00 pm</h3>
            <p>Fixel Institute</p>
            <p>3009 SW Williston Rd, Gainesville, FL 32608</p>
            <p>Special Instructions:</p>
            <p>Fast for 12 hours before the appointment</p>
            <button className = "ApptButton">Cancel or Reschedule Appointment</button>
            <a href="http://localhost:3000/patientview">
                <button className = "ApptButton">Get Directions</button>
            </a>
        </div>
    );
}

export default Appt;