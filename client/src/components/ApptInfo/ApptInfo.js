import React from 'react';
import Appt from './Appt';
import './ApptInfo.css'


function ApptInfo() {
    return (
        <div className = "background">
            <div className="Wrapper">

                <div>
                    <h1>Upcoming Appointment Information:</h1>
                </div>

                <div className = "ApptBlock">
                    <h2>Today:</h2>
                    <Appt/>
                </div>

                <div className="ApptBlock">
                    <h2>Tomorrow:</h2>
                    <p>No Appointments to show!</p>
                </div>

                <div className="ApptBlock">
                    <h2>Later This Week:</h2>
                    <Appt/>
                    <Appt/>
                </div>

                <button className = "ApptBlock">View All</button>

            </div>
        </div>
    );
}

export default ApptInfo;