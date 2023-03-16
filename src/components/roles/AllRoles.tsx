import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { light } from '@mui/material/styles/createPalette';

// Generate Order Data
function createData(
    id: number,
    date: string,
    name: string,
    shipTo: string,
    paymentMethod: string,
    amount: number,
  ) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }
  
  const rows = [
    createData(
      0,
      '16 Mar, 2019',
      'Elvis Presley',
      'Tupelo, MS',
      'VISA ⠀•••• 3719',
      312.44,
    ),
    createData(
      1,
      '16 Mar, 2019',
      'Paul McCartney',
      'London, UK',
      'VISA ⠀•••• 2574',
      866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
      3,
      '16 Mar, 2019',
      'Michael Jackson',
      'Gary, IN',
      'AMEX ⠀•••• 2000',
      654.39,
    ),
    createData(
      4,
      '15 Mar, 2019',
      'Bruce Springsteen',
      'Long Branch, NJ',
      'VISA ⠀•••• 5919',
      212.79,
    ),
  ];

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
  }

const baseUrl = 'http://localhost:8080/roles';
const jwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckBhZG1pbi5jb20iLCJleHAiOjE2Nzg5OTUzMjksImlhdCI6MTY3ODk1OTMyOX0.V6e1EFFNCzS4sOTqOAN0nd5M_oCnPDkYPcKtId2XaiDAchB26-ZCpJTNO94Otu1uAKSB8QgmruN-PzEDa8WMcw';

interface Role {
    id: number,
    name: string
    
}

const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + jwt

    },
    responseType: JSON.stringify,
    data: {}
  };

export default function Roles() {

    const [roles, setRoles] = useState<Role>();
    const [allRoles, setAllRoles] = useState([]);


    useEffect(() => {
        fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': 'Bearer ' + jwt
            }
        })
        .then(res => res.json())
        .then(roles => setRoles(roles))
        .catch(error => console.log(error)
        )
    }, [])

        //   const result = axios.get(baseUrl, axiosConfig);

    console.log(roles);

    return (
      <React.Fragment>
        <ul>
            {/* {roles.map((role) => <li key={role}>role</li>)} */}
        </ul>
        <Title>Roles</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Sale Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align="right">{`$${row.amount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more orders
        </Link>
      </React.Fragment>
    );
  }