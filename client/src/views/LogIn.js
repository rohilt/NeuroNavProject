import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Links from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import NavBar from '../views/Home/NavBar2';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';

import httpUser from '../httpUser'


// Material UI Template used to create login forms design
// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#f57c00',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  palette: {
    primary: blue,
    secondary: {
      main: '#f57c00',
    }
  }
}));


const LogIn = (props) => {
    const [fields, setFields] = useState({email: "", password: ""});
    const [showAlert, setShowAlert] = useState(false);
    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };
    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const user = await httpUser.logIn(fields);

        setFields({email: '', password: ''} );
        if(user) {
            props.onLoginSuccess(user);
            if(user.authLevel == "admin")
            {
                props.history.push('/admin');
            }
            if(user.authLevel == "patient")
            {
                props.history.push('/patientView');
            }
            
            console.log(user.email);
        }
        else {
          setShowAlert(true);
        }
    };

    const classes = useStyles();

    return(
        <MuiThemeProvider theme={theme}>
        <div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          UF Neurosurgery Patient Portal
        </Typography>
            <form onChange={onInputChange} onSubmit={onFormSubmit}>
                <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="email"
               label="Email"
               name="email"
               autoComplete="email"
               value={fields.email}
               autoFocus
               />
                <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               name="password"
               label="Password"
               type="password"
               id="password"
               value={fields.password}
               autoComplete="current-password"
              />
              <Box mt={2}>

              </Box>
                <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 >Log In</Button>
            </form>
            <Box mt={2}>

              </Box>
            <Grid container>
            <Grid item xs>
            </Grid>
            
            <Grid item 
            container
            justify="center"
            alignItems="center"> 
                Don't have an account or need assistance signing in?
                <br />
              <Links href="tel:9047088717" variant="body2">
                {"Click here to call UF Neurosurgery Department Office"}
                <br />
                {"(352) 273-9000"}
              </Links>
              <br />
            </Grid>
          </Grid>
            </div>
        <Box mt={2}>
        <Copyright />
        </Box>
        </Container>
        <Snackbar anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}>
          <Alert severity="error">
            Invalid login!
          </Alert>
        </Snackbar>
        </div>
        </MuiThemeProvider>
    )
};

export default LogIn;