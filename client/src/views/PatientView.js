import React, {useState} from 'react';
import Directions from '../components/Directions/Directions';
import ApptInfo from '../components/ApptInfo/ApptInfo';
import NavBar from '../components/Header/NavBar';




const PatientView = () => {
    const [tabValue, setTabValue] = useState(0);
        return (
          <div>
          <NavBar setTabValue={setTabValue} tabValue={tabValue} />
          {/* {tabValue == 0 ? <Directions/> : null} */}
          {tabValue == 0 ? <div><ApptInfo/></div> : null}
          {/* {tabValue == 1 ? <PatientAppointmentList /> : null} */}
          {/* change the first null to the second tab component */}
          </div>
        )
}
export default PatientView;
