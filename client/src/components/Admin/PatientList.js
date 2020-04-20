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
import { makeStyles } from '@material-ui/core/styles';

const passFlag = 0;

const useStyles = makeStyles(theme =>({
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(25),
    marginRight: theme.spacing(-4),
  },
}));

const PatientList = (props) => {
  const classes = useStyles();
  // const [patientList, setPatientList] = useState([]);
  const [newPatientList, setNewPatientList] = useState([]);
  useEffect(() => {
    axios.get('/patient').then(response => {
      // setPatientList(response.data);
      setNewPatientList(response.data);
      // response.data.forEach((element) => {
      //   setNewPatientList(newPatientList => [...newPatientList, {
      //     _id: element._id,
      //     name: element.name,
      //     lastName: element.lastName,
      //     address: element.address,
      //     emailAddress: element.emailAddress,
      //     phoneNumber: element.phoneNumber,
      //     duration: element.timeToClinic
      
      //   }]);
      // });
      // console.log(patientList);
      // console.log(newPatientList);
    });
  }, [props.updated]);
  return (
    <main className={classes.content}>
    <Container>
      
    <TableContainer component={Paper}>
      <MaterialTable columns={[
        {title: "First Name", field: "name"},
        {title: "M.I.", field: "middleInitial"},
        {title: "Last Name", field: "lastName"},
        {title: "Date of Birth", field: "dateOfBirth", render: rowData => (new Date(rowData.dateOfBirth)).toLocaleDateString()},
        {title: "Address", field: "address"},
        {title: "Email Address", field: "email"},
        {title: "Phone Number", field: "phoneNumber"},
        {title: "Time Needed", field: "timeToClinic"},
      ]}
      /*actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Patient',
          onClick: (event, rowData) => {
            // Do edit operation
            
          },
          
        },
        {
          icon: 'delete',
          tooltip: 'Delete Patient',
          onClick: (event, rowData) => { // Do delete operation
            axios.delete("/patient?id=" + rowData._id);
            console.log("deleted");
            console.log(rowData._id);
          }
        }
      ]}*/
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            axios.put("/patient", {newData, passFlag});
            console.log(newData);
            setTimeout(() => {
                {
                  props.setUpdated(props.updated + 1); 
                }
                resolve();
            }, 1000);
        }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            axios.delete("/patient?id=" + oldData._id);
            setTimeout(() => {
                {
                  props.setUpdated(props.updated + 1); 
                }
                resolve();
            }, 1000);
        })
      }}
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
    </main>
  )

}

export default PatientList;