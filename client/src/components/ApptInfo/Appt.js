import React from 'react';




function Appt(){
    return(
        <div className = "Appt">
            <h2>Test Appointment with Dr. Sapperstein</h2>
            <h3>Monday, March 9th 3:00 pm</h3>
            <p>Fixel Institute</p>
            <p>3009 SW Williston Rd, Gainesville, FL 32608</p>
            <p>Special Instructions:</p>
            <p>Fast for 12 hours before the appointment</p>
            <a href="tel:9047088717">
                <button className = "ApptButton">Cancel or Reschedule</button>
            </a>
            <a href="/Directions2">
                <button className = "ApptButton">Get Directions</button>
            </a>
        </div>
    );
}

export default Appt;