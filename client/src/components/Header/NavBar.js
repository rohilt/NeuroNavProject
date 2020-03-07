import React from 'react';
import { Link } from 'react-router-dom';

// import './NavBar.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => {
    return (
        <div className = "header">
            {/* Logo */}

            {/* <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/logo192.png" } alt="React logo" />
            </Link> */}

            {/* Page Links */}
            {/* <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Home</Link>

                <Link className = "nav-link" to='/Register'>Extra Page</Link>
                <a className = "nav-link" target='_blank' rel="noopener noreferrer" href="https://reactjs.org/docs/getting-started.html">
                    React Docs
                </a>
                <a className = "nav-link" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/tutorial/tutorial.html">React Tutorial</a>
                <a className = "nav-link" target="_blank" rel="noopener norefferer" href="https://nodejs.org/en/docs/">Node Docs</a>
            </div> */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Patient View</Typography>
                </Toolbar>
            </AppBar>
 
        </div>
    )
};

export default NavBar;
