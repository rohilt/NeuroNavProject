import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { TableContainer } from '@material-ui/core';


const AppointmentList = (props) => {
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    axios.get('/appointment').then(response => setAppointmentList(response.data));
  }, [props.updated]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointmentList.map(entry => (
            <TableRow key={entry._id}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.date.substring(0, 10)}</TableCell>
              <TableCell>{entry.date.substring(11, 16)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AppointmentList;