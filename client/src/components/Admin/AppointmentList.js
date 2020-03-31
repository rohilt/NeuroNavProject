import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { TableContainer, Container} from '@material-ui/core';
import MaterialTable from "material-table";



const AppointmentList = (props) => {
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    axios.get('/appointment').then(response => setAppointmentList(response.data));
  }, [props.updated]);
  return (
    <Container>
    <TableContainer component={Paper}>
    <MaterialTable columns={[
        {title: "Patient", field: "patientName"},
        {title: "Date", field: "startTime", render: rowData => (new Date(rowData.startTime)).toLocaleDateString()},
        {title: "Start Time", field: "startTime", render: rowData => (new Date(rowData.startTime)).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'})},
        {title: "End Time", field: "endTime", render: rowData => (new Date(rowData.endTime)).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'})},
        {title: "Description", field: "description"},
      ]}
      actions={[
        {
          icon: 'phone',
          tooltip: 'Remind patient',
          onClick: (event, rowData) => {
            
          }
        }
      ]}
      title="Appointments Database"
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

export default AppointmentList;