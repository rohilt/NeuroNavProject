import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom'
import AddPatient from '../components/Admin/AddPatient';
import AddPatientPage from '../components/Admin/AddPatientPage';
import AddAppointmentPage from '../components/Admin/AddAppointmentPage';
import AdminProfile from '../components/Profile/AdminProfile';

import AddAppointment from '../components/Admin/AddAppointment';
import PatientList from '../components/Admin/PatientList';
import AppointmentList from '../components/Admin/AppointmentList';
import SendText from '../components/Admin/SendText'

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Drawer from '@material-ui/core/Drawer';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import SettingsIcon from '@material-ui/icons/Settings';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Typography from '@material-ui/core/Typography';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Button, CssBaseline, ListItemText, ClickAwayListener, DialogContentText } from '@material-ui/core';
import axios from 'axios';
import httpUser from '../httpUser'
import CalendarPage from '../components/Admin/CalendarPage'

const drawerWidth = 230;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flewGrow: 1,
    overflow: 'auto'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarSpacer: theme.mixins.toolbar,
    title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
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
  const [showSettings, setShowSettings] = useState(false);
  const [calendarId, setCalendarId] = useState("");
  const user2 = httpUser.getCurrentUser().authLevel;
  useEffect(() => {
    axios.get('/calendarId').then(response => {
      setCalendarId(response.data);
    });
    
  }, []);
  if(user2 !== "admin")
  {
    console.log("that aint right")
    return <Redirect to="/home" />
  }
  else{
    console.log("you are permitted to enter")
  }
  const sendTextMessage = () => {
    // add in that here
  }
  return (
    <MuiThemeProvider theme={theme}>
      <div >
        <CssBaseline/>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            
            <Typography variant="h6" className={classes.title}>
              Administrator View
            </Typography>
            <IconButton variant="outlined" color="inherit" onClick={() => setShowSettings(true)}><SettingsIcon/></IconButton>
            <Button component={Link} to="/logout" color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
        <Dialog open={showSettings} onClose={() => setShowSettings(false)}>
          <DialogTitle><Typography variant="h4">Settings</Typography></DialogTitle>
          <DialogContent>
            <DialogContentText>
            <Typography variant="h6">Google Calendar Integration</Typography>
            </DialogContentText>
            <Typography>
              Enter the calendar ID of the Google calendar that you want to integrate the appointments with. To do this, share the calendar with and give editing permissions to <Link href="mailto:neuronavuf@gmail.com" onClick={(e) => e.preventDefault()} color="inherit">neuronavuf@gmail.com</Link>. 
              By default, it is the primary calendar of <Link href="mailto:neuronavuf@gmail.com" onClick={(e) => e.preventDefault()} color="inherit">neuronavuf@gmail.com</Link>. 
            </Typography>
            <br/>
            <TextField fullWidth variant="outlined" label="Calendar ID" value={calendarId} onChange={(e) => setCalendarId(e.target.value)}/>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => {setShowSettings(false)}}>Cancel</Button>
            <Button variant="outlined" onClick={() => {
              axios.post('/calendarId?calendarId=' + calendarId).then(res => console.log(res));
              setShowSettings(false);
            }}>Save Changes</Button>
          </DialogActions>
        </Dialog>
        <Drawer className={classes.drawer} 
                variant="permanent" 
                anchor="left"
                classes={{
                  paper: classes.drawerPaper,
                }}>
          <div className={classes.toolbar}/>
          <Divider />
          <List>
          <ListItem selected={view === 0} button onClick={() => {setView(0);}} key={"patient"}>
              <ListItemIcon><ProfileIcon/></ListItemIcon>
              <ListItemText primary="View Profile"/>
            </ListItem>
            <ListItem selected={view === 1} button onClick={() => {setView(1);}} key={"patient"}>
              <ListItemIcon><PeopleIcon/></ListItemIcon>
              <ListItemText primary="Patients"/>
            </ListItem>
            <Collapse in={true} unmountOnExit>
              <List disablePadding>
                <ListItem selected={view === 3} className={classes.nested} button onClick={() => {setView(3);}} key={"add-patient"}>
                  <ListItemIcon><PersonAddIcon /></ListItemIcon>
                  <ListItemText primary="Add Patient"/>
                </ListItem>
              </List>
            </Collapse>
            <ListItem button selected={view === 2} onClick={() => {setView(2);}} key={"appointments"}>
              <ListItemIcon><ScheduleIcon/></ListItemIcon>
              <ListItemText primary="Appointments"/>
            </ListItem>
            <Collapse in={true} unmountOnExit>
              <List disablePadding>
                <ListItem selected={view === 4} className={classes.nested} button onClick={() => {setView(4);}} key={"add-appointment"}>
                  <ListItemIcon><AddAlarmIcon /></ListItemIcon>
                  <ListItemText primary="Add Appointment"/>
                </ListItem>
              </List>
            </Collapse>
            <ListItem selected={view === 5} button onClick={() => {setView(5);}} key={"calendar"}>
              <ListItemIcon><EventNoteIcon /></ListItemIcon>
              <ListItemText primary="Calendar"/>
            </ListItem>
            <ListItem selected={view === 6} button onClick={() => {setView(6);}} key={"texting"}>
              <ListItemIcon><ChatBubbleOutlineIcon/></ListItemIcon>
              <ListItemText primary="Send Text"/>
            </ListItem>
          </List>
        </Drawer>
        <div className={classes.content}>
          
          {view == 0 ? <div><br /><AdminProfile setUpdated={setUpdated} updated={updated}/></div> : null}
          {view == 1 ? <div><br /><PatientList setUpdated={setUpdated} updated={updated}/></div> : null}
          {view == 2 ? <div><br /><AppointmentList setUpdated={setUpdated} updated={updated}/></div> : null}
          {view == 3 ? <div><AddPatientPage setUpdated={setUpdated} updated={updated}/></div> : null}
          {view == 4 ? <div><AddAppointmentPage updated={updated} setUpdated={setUpdated}/></div> : null}
          {view == 6 ? <div><SendText updated={updated} setUpdated={setUpdated}/></div> : null}
          {view == 5 ? (<div><CalendarPage updated={updated}/> </div>
              
            /*
            <main style={{flexGrow: 1,
                          marginTop: theme.spacing(7),
                          marginLeft: theme.spacing(25),
                          marginRight: theme.spacing(-4),}}>
            <Container fixed>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=bmV1cm9uYXZ1ZkBnbWFpbC5jb20&amp;color=%23039BE5&amp;showTitle=0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
            </Container>
            </main>*/
          ) : null}
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
