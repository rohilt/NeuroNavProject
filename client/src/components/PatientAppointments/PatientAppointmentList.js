import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { TableContainer} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import httpUser from '../../httpUser'



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const PatientAppointmentList = (props) => {
  const classes = useStyles();
  const user = httpUser.getCurrentUser();

  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    axios.get('/appointment').then(response => setAppointmentList(response.data));
  }, [props.updated]);
  return (
    <div>
      <Toolbar>
      <Typography variant="h6"  className={classes.title} >Viewing {user.name}'s appointments</Typography>
      <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  
                    component={Link} to="./patientView"

          >
            Back
          </Button>
      </Toolbar>
      
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointmentList.map(entry => entry.patientId == user._id ? (
            <TableRow key={entry._id}>
              <TableCell>{(new Date(entry.startTime)).toLocaleDateString()}</TableCell>
              <TableCell>{(new Date(entry.startTime)).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'})}</TableCell>
              <TableCell>{(new Date(entry.endTime)).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'})}</TableCell>
              <TableCell>{entry.description}</TableCell>
            </TableRow>
          ) : null)}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default PatientAppointmentList;