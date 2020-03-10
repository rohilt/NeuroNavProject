import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { TableContainer } from '@material-ui/core';


const PatientAppointmentList = (props) => {
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    axios.get('/appointment').then(response => setAppointmentList(response.data));
  }, [props.updated]);
  return (
    <div>
      <Typography>Showing appointments for SamplePatient</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointmentList.map(entry => entry.name == "SamplePatient" ? (
            <TableRow key={entry._id}>
              <TableCell>{entry.date.substring(0, 10)}</TableCell>
              <TableCell>{entry.date.substring(11, 16)}</TableCell>
            </TableRow>
          ) : null)}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default PatientAppointmentList;