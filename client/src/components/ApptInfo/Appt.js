import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      minWidth: 275,
      marginBottom: 5,
    },
    bullet: {
      flexGrow: 1,
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      flexGrow: 1,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function Appt(){
    const classes = useStyles();
    return(
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    Test Appointment with Dr. Sapperstein
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Monday, March 9th 3:00pm at Fixel Institute
                </Typography>
                <Typography variant="body2" component="p">
                    Address: 
                    <br />
                    3009 SW Williston Rd, Gainesville, FL 32608
                    <br />
                    <br />
                    Special Instructions:
                    <br />
                    Fast for 12 hours before the appointment
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" 
                        variant="contained" 
                        href="tel:9047088717" 
                        color="primary"
                > Cancel or Reschedule</Button>
            </CardActions>
        </Card>
    );
}

export default Appt;