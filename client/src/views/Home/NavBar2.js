// import React from 'react';
// import { Link } from 'react-router-dom';

// import './NavBar2.css';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

// const NavBar = () => {
//     return (
//         <div className = "header">
//             {/* Logo */}

//             <Link className = "nav-title" to="/">
//                 <img className = "nav-logo" src={ "/logo192.png" } alt="React logo" />
//             </Link>

//             <b>UF DEPARTMENT OF NEUROSURGERY</b>
//             <div className = "nav-items">
//                 <Link className = "nav-link" to='/Home'>Home</Link>
//                 <Link className = "nav-link" to='/Register'>Extra Page</Link>
//                 <a className = "nav-link" target='_blank' rel="noopener noreferrer" href="https://reactjs.org/docs/getting-started.html">
//                     React Docs
//                 </a>
//                 <a className = "nav-link" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/tutorial/tutorial.html">React Tutorial</a>
//                 <a className = "nav-link" target="_blank" rel="noopener norefferer" href="https://nodejs.org/en/docs/">Node Docs</a>
//             </div>
//             {/* <AppBar position="static">
//                 <Toolbar>
//                     <Typography variant="h6">Patient View</Typography>
//                 </Toolbar>
//             </AppBar> */}
 
//         </div>
//     )
// };

// export default NavBar;

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
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            
          </IconButton>
          <Typography variant="h6" className={classes.title} >
            UF DEPARTMENT OF NEUROSURGERY
          </Typography>
          
          <Links color="inherit" href="tel:9047088717" variant="body2">
                {"Call "}
                {"(352) 273-9000"}
              </Links>
          <Button component={Link} to="/Directions" color="inherit">Directions</Button>
          <Button component={Link} to="/login" color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}