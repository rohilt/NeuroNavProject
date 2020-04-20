import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

// https://www.twilio.com/blog/send-an-sms-react-twilio

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        body: 'This is a test message sent with Twilio from the NeuroNav Web App'
      },
      patientList: [],
      patientName: "",
      submitting: false,
      showAlert: false,
      error: false
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    axios.get('/patient').then(response => {
      this.setState({patientList: response.data})
    });
  }
  
  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    console.log(name);
    console.log(event.target.value);
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    fetch('/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message),
      to: JSON.stringify(this.state.message)

    })
    .then(console.log("TESTING TESTING TESTING"))
    .then(console.log(this.state.message))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            showAlert: true,
            message: {
              body: '',
              to: this.state.message.to
            }
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
      });
  }
  render() {
    return(
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}>
        <Typography component="h3" variant="h6">
        Recipient
        </Typography>
        <div>
          <label htmlFor="to"></label>
          
            <Autocomplete options={this.state.patientList} getOptionLabel={(patient) => (patient.name + ' ' + patient.lastName)} style={{width: 400}} renderInput={(params) => <TextField {...params} label="Select Patient" variant="standard" />}
      onChange={(event, value) => {
        if (!value) {
          this.setState({patientName: ""});
          this.setState({message: {to: "", message: this.state.body}});
        }
        else {
          this.setState({patientName: value.name + ' ' + value.lastName});
          this.setState({message: { ...this.state.message, to: value.phoneNumber }});
        }
      }}></Autocomplete>
        </div>
        <br/>
        <Typography component="h3" variant="h6">
        Message
        </Typography>
        <div>
          <label htmlFor="body"></label>
          <TextField 
          multiline
          id=""
          name="body" 
          id="body"
          value={this.state.message.body}
          onChange={this.onHandleChange}
          />
        </div>
        <br/>
        <Button variant="outlined" color="primary" type="submit">
        Send message
        </Button>
      </form>
      <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',}} 
            open={this.state.showAlert} 
            autoHideDuration={5000} 
            onClose={() => this.setState({showAlert: false})}>
      <Alert severity="success">
      Message sent!
      </Alert>
      </Snackbar>
      </div>
    );
  }


}

export default SMSForm;

 