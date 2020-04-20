import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import './Profile.css'

import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import httpUser from '../../httpUser';

var setFlag = 0;
  



const useStyles = makeStyles(theme =>({
    root: {
      flexGrow: 1,
      minWidth: 275,
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
  }));

  const ApptInfo = (props) => {
    const classes = useStyles();
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
    
    //axios.get('/patient').then(response => setInfoList2(response.data));
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
      
      
    }, [props.updated]);

    return (    
      <div className="Wrapper">
        <Toolbar>
        {InfoList.map(entry => entry.email == user.email ? (

          <div>
          <Typography variant="h5"  className={classes.title} style={{display: 'inline'}}>
            {'Welcome Back, '}
          </Typography>
          <Typography variant="h5" style={{display: 'inline'}} > 
          {entry.name + ' '}
          </Typography>
          <Typography variant="h5" style={{display: 'inline'}} > 
          {entry.lastName} 
          </Typography>
          
          </div>
        ) : null)}
        </Toolbar>
        <div className = "ProfileBox">
        <h2>My Profile: </h2>
        <Card className={classes.root} variant="outlined">
            {InfoList.map(entry => entry._id == user._id ? (
              <div key={entry._id}>
                <CardContent>
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'First Name: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.name} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Middle Initial: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.middleInitial} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Last Name: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.lastName} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Date of Birth: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {(new Date(entry.dateOfBirth)).toLocaleDateString()} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Phone Number: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.phoneNumber} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Email Address: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.email} 
                </Typography>
                <br />
                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                    {'Home Address: '}
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}} > 
                    {entry.address} 
                </Typography>
                
                </CardContent>
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
            
              </div>
            ) : null)}
            
            
        </Card>
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
      </div>
        
    );
}

export default ApptInfo;
