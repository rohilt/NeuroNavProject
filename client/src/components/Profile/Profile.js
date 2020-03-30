import React, {useState, useEffect} from 'react';
import axios from 'axios';

//import Appt from './Appt';
//import './ApptInfo.css'
import './Profile.css'

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import httpUser from '../../httpUser'


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

  const ApptInfo = (props) => {
    const classes = useStyles();
    const user = httpUser.getCurrentUser();

    const [InfoList, setInfoList] = useState([]);
    useEffect(() => {
      axios.get('/patient').then(response => setInfoList(response.data));
    }, [props.updated]);
    return (
        
            <div className="Wrapper">
                <Toolbar>
                <Typography variant="h6"  className={classes.title} >Account Page</Typography>
                </Toolbar>

                <div className = "ProfileBox">
                {InfoList.map(entry => entry.email == user.email ? (
                <div key={entry._id}>
                <div>
                <h2 style={{display: 'inline'}}>Name:</h2>
                <p style={{display: 'inline'}}> {entry.name} </p> 
                </div>
                <div>
                <h2 style={{display: 'inline'}}>Middle Initial:</h2>
                <p style={{display: 'inline'}}> {entry.middleInitial} </p> 
                </div>
                <div>
                <h2 style={{display: 'inline'}}>Last Name:</h2>
                <p style={{display: 'inline'}}> {entry.lastName} </p> 
                </div>
              
                <div>
                <h2 style={{display: 'inline'}}>Date of Birth: </h2>
                <p style={{display: 'inline'}}>{entry.dateOfBirth}</p>
                </div>
                <div>
                <h2 style={{display: 'inline'}}>Phone Number: </h2>
                <p style={{display: 'inline'}}>{entry.phoneNumber}</p>
                </div>
                <div>
                <h2 style={{display: 'inline'}}>Email Address: </h2>
                <p style={{display: 'inline'}}>{entry.email}</p>
                </div>
                <div>
                <h2 style={{display: 'inline'}}>Address: </h2>
                <p style={{display: 'inline'}}>{entry.address}</p>
                </div>
              
                

                </div>
          ) : null)}
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