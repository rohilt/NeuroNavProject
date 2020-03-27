import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Links from '@material-ui/core/Link';
import { Link } from 'react-router-dom';




const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(-100),
  },

 
  title: {
    
    flexGrow: 1
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title} >
            UF DEPARTMENT OF NEUROSURGERY
          </Typography>
          
          <Links color="inherit" href="tel:9047088717" variant="body2">
                {"Call "}
                {"(352) 273-9000"}
              </Links>
          <Button component={Link} to="/home" color="inherit">Home</Button>
          <Button component={Link} to="/Directions" color="inherit">Directions</Button>
          <Button component={Link} to="/login" color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}