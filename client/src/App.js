import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Directions from "./Directions";


const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        
        <Route exact path="/Directions" component={Directions} />
        <Route exact path="/">
          <Redirect to="/Directions" />
        </Route>

        {/* <Route exact path="/login" component={LoginPage} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route> */}


        

      </Switch>
    </div>
  );
}

export default App;


