import React, {useState, useEffect} from 'react';
import AddPatient from '../components/Admin/AddPatient';
import AddAppointment from '../components/Admin/AddAppointment';
import PatientList from '../components/Admin/PatientList';
import AppointmentList from '../components/Admin/AppointmentList';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import DirectionsIcon from '@material-ui/icons/Directions';

import EventNoteIcon from '@material-ui/icons/EventNote';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Drawer from '@material-ui/core/Drawer';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Typography from '@material-ui/core/Typography';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import { Button, CssBaseline, ListItemText, ClickAwayListener } from '@material-ui/core';
import Directions from '../components/Directions/Directions';
import ApptInfo from '../components/ApptInfo/ApptInfo';
import Profile from '../components/Profile/Profile';


const useStyles = makeStyles(theme => ({
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
        },
        logoutButton: {
          marginLeft: theme.spacing(10),
        },

      }));

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


const Admin = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState(0);
  const [value, setValue] = useState(0);
  const [updated, setUpdated] = useState(0);
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar position="static" >
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" onClick={() => setDrawerOpen(true)} edge="start" >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {view == 0 ? "Profile" : null}
              {view == 1 ? "Appointments" : null}
              {view == 2 ? "Directions" : null}
            </Typography>
            <Button component={Link} to="/logout" color="inherit">Logout</Button>
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
            <ListItem button onClick={() => {setView(0);setDrawerOpen(false)}} key={"patient"}>
              <ListItemIcon><ProfileIcon/></ListItemIcon>
              <ListItemText primary="View Profile"/>
            </ListItem>
            <ListItem button onClick={() => {setView(1);setDrawerOpen(false)}} key={"appointments"}>
              <ListItemIcon><ScheduleIcon/></ListItemIcon>
              <ListItemText primary="View Appointments"/>
            </ListItem>
            <ListItem button onClick={() => {setView(2);setDrawerOpen(false)}} key={"add-patient"}>
              <ListItemIcon><DirectionsIcon /></ListItemIcon>
              <ListItemText primary="Directions"/>
            </ListItem>
         
          </List>
        </Drawer>
        <div className={classes.content}>
          
          {view == 0 ? <div><Profile updated={updated} setUpdated={setUpdated}/> </div> : null}
          {view == 1 ? <div><ApptInfo updated={updated} setUpdated={setUpdated}/></div> : null}
          {view == 2 ? <div><Directions updated={updated} setUpdated={setUpdated}/></div> : null}
          


        </div>
        {/* <AppBar position="static">
          <Toolbar>
            <Typography variant="h6"  className={classes.title} >Admin View</Typography>
            <Button component={Link} to="/home" color="inherit">Logout</Button>
          </Toolbar>
          <Tabs value={value} onChange={(e, newValue) => {setValue(newValue)}} indicatorColor="primary" textColor="inherit" centered>
            <Tab label="Patients"/>
            <Tab label="Appointments"/>
          </Tabs>
        </AppBar>
        {value == 0 ? <div><AddPatient updated={updated} setUpdated={setUpdated}/> <PatientList updated={updated}/></div> : null}
        {value == 1 ? <div><AddAppointment updated={updated} setUpdated={setUpdated}/><AppointmentList updated={updated}/></div> : null} */}
      </div>
    </MuiThemeProvider>
  )
}

export default Admin;

