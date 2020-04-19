import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// https://www.twilio.com/blog/send-an-sms-react-twilio

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '+15072501199',
        body: 'This is a test message sent with Twilio from the NeuroNav Web App'
      },
      submitting: false,
      error: false
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandleChange(event) {
    const name = event.target.getAttribute('name');
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
      body: JSON.stringify(this.state.message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
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
      <main style={{flexGrow: 1,
                   marginTop: 5,
                   marginLeft: 100,}}>
      <div style={{display: 'flex',
                   justifyContent:'center',
                   alignItems:'center',
                   height: '50vh',
                   marginLeft: 10,}}>
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}>
        <Typography component="h3" variant="h6">
        Recipient
        </Typography>
        <div>
          <label htmlFor="to"></label>
          <TextField
          
            type="tel"
            name="to"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
            />
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
      </div>
      </main>
    );
  }


}

export default SMSForm;

 