import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import httpUser from '../../httpUser'
import { TableContainer, Container, DialogActions} from '@material-ui/core';
import MaterialTable from "material-table";



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
  const classes = useStyles();
  const [appointmentList, setAppointmentList] = useState([]);
  
  
  const user = httpUser.getCurrentUser();
  useEffect(() => {
    axios.get('/appointment').then(response => 
{

      const result =  response.data.filter(entry=> entry.patientId == user._id)
      setAppointmentList(result);
});

  }, [props.updated]);
  return (

    <Container>
          <Toolbar>
      <Typography variant="h6"  className={classes.title} >Viewing {user.name}'s appointments</Typography>
      <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  
                    component={Link} to="./patientView"
          >
            Back
          </Button>
      </Toolbar>
    <TableContainer component={Paper}>
    <MaterialTable columns={[
        {title: "Patient", field: "patientName"},
        {title: "Date", field: "startTime", render: rowData => (new Date(rowData.startTime)).toLocaleDateString()},
        {title: "Start Time", field: "startTime", render: rowData => (new Date(rowData.startTime)).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'})},
        {title: "End Time", field: "endTime", render: rowData => (new Date(rowData.endTime)).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'})},
        {title: "Doctor", field: "doctor"},
        {title: "Location", field: "location"},
        {title: "Description", field: "description"}
      ]}
     
      title=""
      data={appointmentList}
      />
      {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointmentList.map(entry => (
            <TableRow key={entry._id}>
              <TableCell>{entry.patientName}</TableCell>
              <TableCell>{entry.startTime}</TableCell>
              <TableCell>{entry.endTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </TableContainer>

    </Container>
  )
}

export default PatientAppointmentList;