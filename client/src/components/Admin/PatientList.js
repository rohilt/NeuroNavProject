import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { TableContainer } from '@material-ui/core';

const PatientList = (props) => {
  const [patientList, setPatientList] = useState([]);
  useEffect(() => {
    axios.get('/patient').then(response => setPatientList(response.data));
  }, [props.updated]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientList.map(entry => (
            <TableRow key={entry.name}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.emailAddress}</TableCell>
              <TableCell>{entry.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

}

export default PatientList;