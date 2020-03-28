import React from 'react';
//import Appt from './Appt';
//import './ApptInfo.css'
import './Profile.css'

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function ApptInfo() {
    const classes = useStyles();

    return (
        
            <div className="Wrapper">
                <Toolbar>
                <Typography variant="h6"  className={classes.title} >Account Page</Typography>
                {/* <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  
                    component={Link} to="./viewAll"

                >
                View All
                </Button> */}
                </Toolbar>

                

                <div className = "ProfileBox">
                    <h2>Username:</h2>
                    <h2>Email Address:</h2>
                    <h2>Phone Number:</h2>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <Grid container spacing={2} justify="center">
                <Grid item>
                    
                    

                  <Button 
                  type="submit"
                  variant="contained" 
                  color="primary"
                  component={Link} to="/login">
                    Reset password
                  </Button>
                </Grid>
                </Grid>

                </div>

                {/* <div className="ApptBlock">
                    <h2>Tomorrow:</h2>
                    <p>No Appointments to show!</p>
                </div>

                <div className="ApptBlock">
                    <h2>Later This Week:</h2>
                </div> */}

                {/* <button className = "ApptBlock" component={Link} to={viewAll}>View All</button> */}
                


            </div>
        
    );
}

export default ApptInfo;