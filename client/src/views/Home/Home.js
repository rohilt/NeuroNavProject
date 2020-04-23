
import NavBar from "./NavBar2"

import './Home.css';

import React, {useState, useEffect} from 'react';
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

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsIcon from '@material-ui/icons/Directions';
import LoginIcon from '@material-ui/icons/VpnKey';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Drawer from '@material-ui/core/Drawer';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


import {ListItemText, ClickAwayListener } from '@material-ui/core';

import Directions from "../../components/Directions/Directions";
import HomeView from "../../views/Home/HomeView";
import Login from '../../views/LogIn';

import httpUser from '../../httpUser'




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
  
  root: {
    flexGrow: 1,
  },
  content: {
    flewGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  }
}));


export const Home = (props) => {

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState(0);
  const [updated, setUpdated] = useState(0);

  const login = () => {
    setView(2);
  }

  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" onClick={() => setDrawerOpen(true)} edge="start">
              <MenuIcon />
            </IconButton>
          <Typography variant="h6" className={classes.title} >
            UF DEPARTMENT OF NEUROSURGERY
          </Typography>
          <Button  onClick = {login} color="inherit">Login</Button>
          

        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} variant="temporary">
          <div>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => {setView(0);setDrawerOpen(false)}} key={"home"}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary="Home"/>
            </ListItem>
            <ListItem button onClick={() => {setView(1);setDrawerOpen(false)}} key={"directions"}>
              <ListItemIcon><DirectionsIcon/></ListItemIcon>
              <ListItemText primary="Directions"/>
            </ListItem>
            <ListItem button onClick={() => {setView(2);setDrawerOpen(false)}} key={"login"}>
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Login"/>
  </ListItem>
          </List>
        </Drawer>
        <div className={classes.content}>
          
          {view == 0 ? <div><HomeView updated={updated} setUpdated={setUpdated} setView={setView}/> </div> : null}
          {view == 1 ? <div><Directions updated={updated} setUpdated={setUpdated}/></div> : null}
          {view == 2 ? <div><Login updated={updated} setUpdated={setUpdated} onLoginSuccess={props.onLoginSuccess} history={props.history}/></div> : null}


        </div>
    </div>
    
    </MuiThemeProvider>
  );
}



export default Home;









