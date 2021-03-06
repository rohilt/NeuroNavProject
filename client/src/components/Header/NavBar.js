import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


// import './NavBar.css';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { PromiseProvider } from 'mongoose';

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
    butt: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
  }));

const NavBar = (props) => {
    const classes = useStyles();

    return (
        <div className = {classes.root}>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6"  className={classes.title} >Patient View</Typography>
<<<<<<< HEAD
                    <div className={classes.butt}>
                    <Button component={Link} to="/profile" variant="contained" color="default">My Account</Button>
                    <Button component={Link} to="/login" variant="contained" color="default">Logout</Button>
                    </div>
=======
                    <Button component={Link} to="/logout" color="inherit">Logout</Button>
>>>>>>> fbd61196016542db016e4a2c399cdb64ce55a603
                </Toolbar>
                <Tabs value={props.tabValue} onChange={(e, newValue) => props.setTabValue(newValue)}>
                    <Tab label="View Profile"/>
                    <Tab label="View Appointments"/>
                    <Tab label="Directions"/>
                    
                </Tabs>
                

            </AppBar>
 
        </div>
    )
};

export default NavBar;
