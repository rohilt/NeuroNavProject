import React from 'react';
import Directions from '../components/Directions/Directions';

import NavBar from '../components/Header/NavBar'

const PatientView = () => {
        return (
          <div>
          <NavBar/>This is the view that the patient sees
          <Directions/>
          </div>
        )
}
export default PatientView;
