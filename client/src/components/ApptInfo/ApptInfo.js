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
                    <b>Tomorrow:</b>
                </div>

                <div className="ApptBlock">
                    <b>This Week:</b>
                </div>

                <button>View All</button>

            </div>
        </div>
    );
}

export default ApptInfo;