import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import PatientLogin from "./views/PatientLogin"
import PatientView from "./views/PatientView"
import Admin from "./views/Admin"
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Directions from "./components/Directions/Directions";


const App = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/login" component={PatientLogin} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/patientview" component={PatientView} /> {/* remove this later! */}
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;