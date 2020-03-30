import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { TableContainer } from '@material-ui/core';
import MaterialTable from "material-table";

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
          lastName: element.lastName,
          address: element.address,
          emailAddress: element.emailAddress,
          phoneNumber: element.phoneNumber,
          duration: element.timeToClinic
      
        }]);
      });
      // console.log(patientList);
      // console.log(newPatientList);
    });
  }, [props.updated]);
  return (
    <Container>
      
    <TableContainer component={Paper}>
      <MaterialTable columns={[
        {title: "First Name", field: "name"},
        {title: "M.I.", field: "middleInitial"},
        {title: "Last Name", field: "lastName"},
        {title: "Date of Birth", field: "dateOfBirth"},
        {title: "Address", field: "address"},
        {title: "Email Address", field: "emailAddress"},
        {title: "Phone Number", field: "phoneNumber"},
        {title: "Time Needed", field: "duration"}
      ]}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Save User',
          onClick: (event, rowData) => {
            // Do save operation
          }
        },
        {
          icon: 'delete',
          tooltip: 'Save User',
          onClick: (event, rowData) => {
            // Do save operation
          }
        }
      ]}
      title="Patients Database"
      data={newPatientList}
      />
      {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Time Needed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newPatientList.map((entry) => (
            <TableRow key={entry._id}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.address}</TableCell>
              <TableCell>{entry.emailAddress}</TableCell>
              <TableCell>{entry.phoneNumber}</TableCell>
              <TableCell>{entry.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </TableContainer>
    </Container>
  )

}

export default PatientList;