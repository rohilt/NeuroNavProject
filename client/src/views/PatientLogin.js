  
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, makeStyles, Grid, StylesProvider, Typography} from '@material-ui/core';
import Background from '../assets/background.png';


const useStyles = makeStyles(theme => ({
  paperContainer: {
     backgroundImage: `url(${Background})`,
    // width: '100%',
    //  height: '100%',
    //  backgroundSize: 'contain',
    //______________________________
     backgroundPosition: 'cover',
    backgroundPosition: 'center',
    width: `calc(94vw + 175px)`,
    height: 997,
    margin: -120,
    padding: 30,
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
      //justify: 'center',
      background: 'white'
      
    },
  },
  loginbutton: {
    background: 'orange',
    fontSize: 16,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'blue',
    height: 48,
    padding: '0 100px', 
    justifyContent: 'right',
    
  },
  user: {
    color: 'black',
  },
  loginText:{
    color: 'orange',
  }

}));

const PatientLogin = () => {
  const classes = useStyles();
  
        return (
        //<div className = "background">
        //<div className="Wrapper">

                 //<div>
                  //       This is the login page <br />
                    <div className={classes.paperContainer}>
                        
                      <Grid  container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }

                        }  >
                          <Typography className={classes.loginText} component="h1" variant="h4">
                            Login
                          </Typography>
                      <form className={classes.root} noValidate autoComplete="off">
                    
                        <TextField className={classes.user} color='white' id="outlined-basic" label="Username" variant="outlined" />
                        <div>
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                        </div>
                        <br></br>
                        <Button className={classes.loginbutton} component={Link} to="/patientview" variant="outlined" color="primary">Login</Button>
                      </form>
                      </Grid>
                  </div>
                  //</div>
         
        )
                        
}

export default PatientLogin;