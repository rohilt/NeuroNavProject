  
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, makeStyles, Grid} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  asd: {
    background: theme.background,
    fontSize: 16,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'blue',
    height: 48,
    padding: '0 80px', 
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
                        <Grid  container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}  >
                      <form className={classes.root} noValidate autoComplete="off">
                    
                        <TextField className={classes.user} id="outlined-basic" label="Username" variant="outlined" />
                        <div>
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                        </div>
                        <Button className={classes.asd} component={Link} to="/patientview" variant="outlined" color="primary">Login</Button>
                      </form>
                      </Grid>
          // </div>
         
        )
                        
}

export default PatientLogin;