import React, {useState} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import PatientLogin from "./views/PatientLogin"
import PatientView from "./views/PatientView"
import Admin from "./views/Admin"
import NotFound from "./views/NotFound";

import LogIn from "./views/LogIn.js"
import AddPatient from "./components/Admin/AddPatient"
import LogOut from "./views/LogOut"
import httpUser from './httpUser'

import Directions from "./components/Directions/Directions";
import Directions2 from "./components/Directions/Directions2";

import viewAll from "./views/viewAll"




const App = () => {
  const [currentUser, setCurrentUser] = useState(httpUser.getCurrentUser());

  const onLoginSuccess = () => {
      setCurrentUser(httpUser.getCurrentUser());
  };

  const logOut = () => {
      httpUser.logOut();
      setCurrentUser(null);
  };

  return (
    <div>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/Directions" component={Directions} />
        <Route exact path="/Directions2" component={Directions2} />
        
        <Route path="/login" render={(props) => {
              return <LogIn {...props} onLoginSuccess={onLoginSuccess} />
          }} />
        <Route path="/addpatient " render={(props) => {
              return <AddPatient  {...props} onSignUpSuccess={onLoginSuccess} />
          }} />
        <Route path="/logout" render={(props) => {
              return <LogOut onLogOut={logOut} />
          }}/>

          <Route path="/logout" render={(props) => {
              return <LogOut onLogOut={logOut} />
          }}/>

          <Route path="/home" render={(props) => {
              return <Home {...props} onLoginSuccess={onLoginSuccess} />
          }} />
        
        {/* <Route exact path="/home" component={Home} /> */}
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