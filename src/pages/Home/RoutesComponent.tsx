import Grid from '@mui/material/Grid';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import isAuth from '../../hoc/isAuth';
import Departments from '../../models/departments/AllDepartments';
import RequestsGrid from '../../models/RequestsGrid/RequestsGrid';
import Roles from '../../models/roles/AllRoles';
import TypeEmployeeGrid from '../../models/TypeEmployeeGrid/TypeEmployeeGrid';
import Users from '../../models/users/AllUsers';
import { LogOut } from '../../services/authService';
import DashBoard from '../dashboard/DashBoard';
import DashBoardByEmployee from '../dashboard/DashBoardByEmployee';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import AccessDenied from '../AccessDenied';
import './Home.css';

function RoutesComponent() {
    return (
            <Grid container >
              <Routes>
                <Route index Component={isAuth(DashBoard)}></Route>
                <Route path={'/requests/employee/:id'} Component={isAuth(DashBoardByEmployee)}></Route>
                <Route path='/users' Component={isAuth(Users)}></Route>
                <Route path='/departments' Component={isAuth(Departments)}></Route>
                <Route path='/requests' Component={isAuth(RequestsGrid)} />
                <Route path='/types' Component={isAuth(TypeEmployeeGrid)} />
                <Route path='/roles' Component={isAuth(Roles)}></Route>
                <Route path='/login' Component={SignIn}></Route>
                <Route path='/logout' Component={LogOut}></Route>
                <Route path='/404' Component={NotFound}></Route>
                <Route path='/403' Component={AccessDenied}></Route>
                <Route path='*' element={<Navigate to="/404" replace />}></Route>
              </Routes>
            </Grid>
 
    );
  }
  
  export default RoutesComponent;