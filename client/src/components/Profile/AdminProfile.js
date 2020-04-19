import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import './Profile.css'

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import httpUser from '../../httpUser'


const useStyles = makeStyles(theme =>({
    root: {
      flexGrow: 1,
      minWidth: 275,
    },
    bullet: {
      flexGrow: 1,
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(25),
      marginRight: theme.spacing(-4),
    },
  }));

  const ApptInfo = (props) => {
    const classes = useStyles();
    const user = httpUser.getCurrentUser();
    const [appointmentList, setAppointmentList] = useState([]);

    const [InfoList, setInfoList] = useState([]);
    useEffect(() => {
      axios.get('/patient').then(response => setInfoList(response.data));
      axios.get('/appointment').then(response => {
        const result =  response.data.filter(date=> new Date(date.startTime).toLocaleDateString() == new Date().toLocaleDateString())
        setAppointmentList(result)
       
      });
      
    }, [props.updated]);

    return (    
      <main className={classes.content}>
      <div className={classes.toolbar}>
        <Toolbar>
          
        {InfoList.map(entry => entry.email == user.email ? (
          <div>
          <Typography variant="h5"  className={classes.title} style={{display: 'inline'}}>
            {'Welcome Back, '}
          </Typography>
          <Typography variant="h5" style={{display: 'inline'}} > 
          {entry.name + ' '}
          </Typography>
          <Typography variant="h5" style={{display: 'inline'}} > 
          {entry.lastName} 
          </Typography>
          
          </div>
        ) : null)}
       
          
          <br />
      
          
        </Toolbar>
        <div className={classes.toolbar}>
          <Toolbar>
          <Typography variant="h6" component="h2" style={{display: 'inline'}}>
                    {'Number of appointments today: '}
                </Typography>
                <Typography variant="h5" style={{display: 'inline'}} > 
                    {appointmentList.length} 
                </Typography>
          </Toolbar>
          
          </div>
        <div className = "ProfileBox">
        <Card className={classes.root} variant="outlined">
            {InfoList.map(entry => entry.email == user.email ? (
              <div key={entry._id}>
                <CardContent>
                
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'First Name: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.name} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Middle Initial: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.middleInitial} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Last Name: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.lastName} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Date of Birth: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {(new Date(entry.dateOfBirth)).toLocaleDateString()} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Phone Number: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.phoneNumber} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Email Address: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.email} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Home Address: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.address} 
                </Typography>
                
                </CardContent>
              </div>
            ) : null)}
            
            <CardActions>
                <Button size="small" 
                        variant="contained" 
                        component={Link} to="/login"
                        color="primary"
                > Reset Password</Button>
            </CardActions>
        </Card>
        </div>
      </div>
      </main> 
    );
}

export default ApptInfo;
