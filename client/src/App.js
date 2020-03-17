import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import PatientLogin from "./views/PatientLogin"
import PatientView from "./views/PatientView"
import Admin from "./views/Admin"
import NotFound from "./views/NotFound";

import Directions from "./components/Directions/Directions";
import Directions2 from "./components/Directions/Directions2";

import viewAll from "./views/viewAll"




const App = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/Directions" component={Directions} />
        <Route exact path="/Directions2" component={Directions2} />
        
        <Route exact path="/login" component={PatientLogin} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/patientview" component={PatientView} /> {/* remove this later! */}
        <Route exact path="/viewAll" component={viewAll} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;