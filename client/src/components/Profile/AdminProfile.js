import React, {useState, useEffect} from 'react';
import axios from 'axios';

import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import EventIcon from '@material-ui/icons/Event';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import { DialogContent, DialogTitle, DialogActions, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import './Profile.css'

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import httpUser from '../../httpUser'


const useStyles = makeStyles(theme =>({
    root: {
      flexGrow: 1,
      width: '60%'
    },
    bullet: {
      flexGrow: 1,
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(25),
      marginRight: theme.spacing(-4),
    },
    profileAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    }
  }));

  const ApptInfo = (props) => {
    const classes = useStyles();
    // const user = httpUser.getCurrentUser();
    const [appointmentList, setAppointmentList] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openPassDialog, setOpenPassDialog] = useState(false);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setaddress] = useState("");
    const [pass, setPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    var user2;
    var user = httpUser.getCurrentUser();
    var newData = {__v : 0, _id: "", name: "", middleInitial: "", lastName: "", dateOfBirth: "", phoneNumber: "", address: "", email: "", password: ""}; 
  
    var tempEmail = user.email;
    var tempAddr = user.address;
    var tempPhone = user.phoneNumber;
    //const [email, setEmail] = useState("");
    var fields = {email: "", password: ""}
    
    if(newData._id == "") {
      newData = httpUser.getCurrentUser();
      
      console.log("it was empty2");
    }
    
    tempEmail = user.email;
    var passFlag = 0;
    const handleSubmit = async (e) => {
      newData._id = user._id;
      newData.name = user.name;
      newData.middleInitial = user.middleInitial;
      newData.lastName = user.lastName;
      newData.dateOfBirth = user.dateOfBirth;
      newData.email = email;
      newData.address = address;
      newData.phoneNumber = phoneNumber;
      console.log(tempEmail);
      fields.email = tempEmail;
      fields.password = pass;
      user2 = await httpUser.logIn(fields);
      if(user2) {
        setOpenDialog(false);
        passFlag = 0;
        axios.put("/patient", {newData, passFlag});
        console.log(newData);
      
        localStorage.setItem( 'addr', newData.address );
        localStorage.setItem( 'phone', newData.phoneNumber );
        localStorage.setItem( 'email', newData.email );
        setPass("");
        setNewPass("");
        window.location.reload();
    }
  else {
    setShowAlert(true);
  }
  
};

    const handleOpen = () => {
      user = httpUser.getCurrentUser();
      console.log(user);
      tempAddr = localStorage.getItem( 'addr' );
      tempPhone = localStorage.getItem( 'phone' );
      tempEmail = localStorage.getItem( 'email' );
      console.log("tempAddr");
      console.log(tempAddr);
      if(tempAddr == null)
      {
        console.log("they are all empty");
        console.log("tempAddr");
        tempAddr = user.address;
        tempPhone = user.phoneNumber;
        tempEmail = user.email;
      }
      localStorage.removeItem('addr');
      localStorage.removeItem('phone');
      localStorage.removeItem('email');
      console.log(newData);
      setEmail(tempEmail);
      setPhoneNumber(tempPhone);
      setaddress(tempAddr);
      setOpenDialog(true);
      tempEmail = newData.email;
    };

    const handlePassSubmit = async (e) => {
      newData._id = user._id;
      newData.password = newPass;
      tempEmail = localStorage.getItem( 'email' );
      if(tempEmail == null)
      {
        tempEmail = user.email;
      }
      fields.email = tempEmail;
      console.log(tempEmail)
          fields.password = pass;
          user2 = await httpUser.logIn(fields);
          if(user2) {
            setOpenPassDialog(false);
            passFlag = 77;
            axios.put("/patient", {newData, passFlag});
            console.log(newData);
            passFlag = 0;
            setShowAlertSuccess(true);
            setPass("");
            setNewPass("");
            //window.location.reload();
        }
      else {
        setShowAlert(true);
      }
    }

    const handlePassOpen = () => {
      user = httpUser.getCurrentUser();
      tempEmail = localStorage.getItem( 'email' );
      if(tempEmail == null)
      {
        tempEmail = user.email;
      }
      setEmail(tempEmail);
      setOpenPassDialog(true);
      //tempEmail = user.email;
    }
    const [InfoList, setInfoList] = useState([]);
    useEffect(() => {
      axios.get('/patient').then(response => setInfoList(response.data));
      axios.get('/appointment').then(response => {
        const result =  response.data.filter(date=> new Date(date.startTime).toLocaleDateString() == new Date().toLocaleDateString())
        setAppointmentList(result)
       
      });
      
    }, [props.updated]);

    return (    
      <main className={classes.content}>
        <br/>
        
        <div className = "ProfileBox">
          <center>
        <Card className={classes.root} variant="outlined">
            {InfoList.map(entry => entry.email == user.email ? (
              <div key={entry._id}>
                <CardContent>
                  <center>
                <Avatar className={classes.profileAvatar}><Typography variant="h4">{entry.name[0] + entry.lastName[0]}</Typography></Avatar>
                <br/>
                <Typography variant="h4"  className={classes.title} style={{display: 'inline'}}>
            {'Welcome back, '}
          </Typography>
          <Typography variant="h4" style={{display: 'inline'}} > 
          {entry.name + ' '}
          </Typography>
          <Typography variant="h4" style={{display: 'inline'}} > 
          {entry.lastName + '!'} 
          </Typography>
                </center>
                <List>
            <ListItem align="center">
              <ListItemIcon>
                <Badge badgeContent={appointmentList.length} color="primary"><EventIcon/></Badge>
              </ListItemIcon>
              <ListItemText primary={"There are " + appointmentList.length + " appointments today."}/>
            </ListItem>
          </List>
                <Grid container spacing={1}>
                  <Grid xs={6}>
                  <ListItem>
                    <ListItemIcon><PersonIcon/></ListItemIcon>
                    <ListItemText primary={entry.name} secondary="First name"/>
                  </ListItem>

                  </Grid>
                    
                  <Grid xs={6}>
                  <ListItem>
                    <ListItemIcon><PersonIcon/></ListItemIcon>
                    <ListItemText primary={entry.lastName} secondary="Last name"/>
                  </ListItem>
                    
                  </Grid>
                  <Grid xs={6}>
                  <ListItem>
                    <ListItemIcon><EventIcon/></ListItemIcon>
                    <ListItemText primary={(new Date(entry.dateOfBirth)).toLocaleDateString()} secondary="Date of Birth"/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary={entry.address} secondary="Address"/>
                  </ListItem>
                  </Grid>
                  <Grid xs={6}>
                  <ListItem>
                    <ListItemIcon><PhoneIcon/></ListItemIcon>
                    <ListItemText primary={entry.phoneNumber} secondary="Phone number"/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><EmailIcon/></ListItemIcon>
                    <ListItemText primary={entry.email} secondary="Email"/>
                  </ListItem>
                  </Grid>
                </Grid>
              
                
                </CardContent>
              </div>
            ) : null)}
            
            <CardActions>
            <Button variant="outlined" color="primary" onClick={handleOpen}>Edit Contact Information</Button>
              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit Contact Information</DialogTitle>
                <DialogContent>
                  <TextField margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" fullWidth/>
                  <TextField margin="dense" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} label="Phone Number" fullWidth/>
                  <TextField margin="dense" value={address} onChange={(e) => setaddress(e.target.value)} label="Address" fullWidth/>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      onChange={(e) => setPass(e.target.value)}
                      name="password"
                      label="Please Type In Password To Confirm"
                      type="password"
                      id="password"
                      value={pass}
                      autoComplete="current-password"
                      />
                </DialogContent>
                <DialogActions>
                  <Button onClick={ handleSubmit}>Submit</Button>
                </DialogActions>

              </Dialog>

              <Button variant="outlined" color="primary" onClick={handlePassOpen}>Update Password</Button>
              <Dialog open={openPassDialog} onClose={() => setOpenPassDialog(false)}>
                <DialogTitle>Update Password</DialogTitle>
                <DialogContent>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      onChange={(e) => setPass(e.target.value)}
                      name="password"
                      label="Current Password"
                      type="password"
                      id="password"
                      value={pass}
                      autoComplete="current-password"
                      />
                      <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      onChange={(e) => setNewPass(e.target.value)}
                      name="password"
                      label="New Password"
                      type="password"
                      id="password"
                      value={newPass}
                      />
                </DialogContent>
                <DialogActions>
                  <Button onClick={ handlePassSubmit}>Submit</Button>
                </DialogActions>

              </Dialog>


            </CardActions>
        </Card>
        </center>
        <br/>
        <Snackbar anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}>
          <Alert severity="error">
            Incorrect Password!
          </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} open={showAlertSuccess} autoHideDuration={5000} onClose={() => setShowAlertSuccess(false)}>
          <Alert severity="Success">
            Password Changed!
          </Alert>
        </Snackbar>
      </div>

      </main> 
    );
}

export default ApptInfo;
