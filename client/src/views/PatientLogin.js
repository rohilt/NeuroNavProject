  
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, makeStyles, Grid, StylesProvider} from '@material-ui/core';
import Background from '../assets/background.png';


const useStyles = makeStyles(theme => ({
  paperContainer: {
    backgroundImage: `url(${Background})`
    
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
      justify: 'center',
      background: 'white'
      
    },
  },
  asd: {
    
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
    
  },

}));

const PatientLogin = () => {
  const classes = useStyles();
  
        return (
        //<div className = "background">
        //<div className="Wrapper">

                // <div className={classes.root}>
                //         This is the login page <br />
                    <div className={classes.paperContainer}>
                        <Grid  container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }

                        }  >
                          
                      <form className={classes.root} noValidate autoComplete="off">
                    
                        <TextField className={classes.user} id="outlined-basic" label="Username" variant="outlined" />
                        <div>
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                        </div>
                        <Button className={classes.asd} component={Link} to="/patientview" variant="outlined" color="primary">Login</Button>
                      </form>
                      </Grid>
                  </div>
         
        )
                        
}

export default PatientLogin;