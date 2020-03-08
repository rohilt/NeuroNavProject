import React, {useState} from 'react';
import Directions from '../components/Directions/Directions';

import NavBar from '../components/Header/NavBar'


const PatientView = () => {
    const [tabValue, setTabValue] = useState(0);
        return (
          <div>
          <NavBar setTabValue={setTabValue} tabValue={tabValue} />
          {tabValue == 0 ? <Directions/> : null}
          {tabValue == 1 ? null : null}
          {/* change the first null to the second tab component */}
          {tabValue == 2 ? null : null}
          {/* change the first null to the third tab component */}
          </div>
        )
}
export default PatientView;
