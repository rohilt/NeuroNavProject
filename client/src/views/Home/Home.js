
import NavBar from "./NavBar2"

import './Home.css';

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Links from '@material-ui/core/Link';
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


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  palette: {
    primary: blue,
    secondary: {
      main: '#f44336',
    }
  }
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

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Home() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
    <NavBar />
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              UF Department of Neurosurgery 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              At the University of Florida Department of Neurosurgery our goal is to deliver Excellence in 
              Patient Care, Excellence in Resident Education, and Excellence in Research.
            </Typography>
            <Typography variant="h6" align="center" color="textPrimary" gutterButtom>
             New Appointments: (352)-273-6990
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button 
                  type="submit"
                  variant="contained" 
                  color="secondary"
                  component={Link} to="/login">
                    Login for Appointment Information 
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  component={Link} to="/directions">
                    Click for Directions
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          UF Health
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        UF Health is a collaboration of the University of Florida Health Science Center, Shands hospitals and other health care entities.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
    </MuiThemeProvider>
  );
}



export default Home;









