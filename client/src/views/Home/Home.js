import React from 'react';
import NavBar from "./NavBar2"

import './Home.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Links from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fb8c00',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(-100),
    },
    palette: {
        primary: blue,
        secondary: {
          main: '#f44336',
        },
    },
  
   
    title: {
      
      flexGrow: 1
    },
    
  }));

  function Copyright() {
    return (
      
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Links color="inherit" href="https://material-ui.com/">
          UF Neurosurgery Department
        </Links>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function Home() {
    const classes = useStyles();
    
    return (
        <MuiThemeProvider theme={theme}>
        <div className="App" >
            <NavBar />
            <header className="App-header" >
                
                 
                
                
            </header>
            <div>


<Container component="main" maxWidth="xs">
  <CssBaseline />
  <div className={classes.paper}>



      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        component={Link} to="/directions"

      >
        Click for Directions
       
      </Button>

       
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        component={Link} to="/login"

      >
        Login for Appointment Information
       
      </Button>
     


  </div>
  <Box mt={8}>
    <Copyright />
  </Box>
</Container>
</div>



        </div>
        </MuiThemeProvider>

                    
    );
}

export default Home;
