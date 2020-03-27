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
  // const [patientList, setPatientList] = useState([]);
  const [newPatientList, setNewPatientList] = useState([]);
  useEffect(() => {
    axios.get('/patient').then(response => {
      // setPatientList(response.data);
      response.data.forEach((element) => {
        setNewPatientList(newPatientList => [...newPatientList, {
          _id: element._id,
          name: element.name,
          address: element.address,
          emailAddress: element.emailAddress,
          duration: element.timeToClinic
      
        }]);
      });
      // console.log(patientList);
      // console.log(newPatientList);
    });
  }, [props.updated]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Time Needed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newPatientList.map((entry) => (
            <TableRow key={entry._id}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.address}</TableCell>
              <TableCell>{entry.emailAddress}</TableCell>
              <TableCell>{entry.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

}

export default PatientList;