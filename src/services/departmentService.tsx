import { useEffect, useState } from 'react';
import axios from 'axios';

const baseDepartmentUrl = 'http://localhost:8080/departments/'

const withAuthHeader = () => ({
    headers: {
      'Authorization': localStorage.getItem('SavedToken')
    }
  });


type Department = {
    id: number
    name: string
    adminEmail: string
    employeeEmails: string[]
}

  interface DepartmentViewProp {
    id: number
}

type DepartmentDetails = {
    id: number,
    name: string,
    adminEmail: string,
    employeeEmails: string[]
    createdAt: string
    createdBy?: string
    lastModifiedAt?: string
    lastModifiedBy?: string
}

export const useFetchAll = (refresh: number) => {
    const [department, setDepartment] = useState<Department[]>([]);


    useEffect(() => {
      loadDepartments();
    }, [refresh]);
  
    const loadDepartments = async () => {
      const result = await axios.get(baseDepartmentUrl, withAuthHeader())
        .then(response => setDepartment(response.data))
        .catch(error => console.log(error))
        
    } 

    return department;
}

export const useFetchOne = (props:number) => {
    const [department, setDepartment] = useState<DepartmentDetails>();
    
  useEffect(() => {
    loadDepartment();
  }, []);
  

  const loadDepartment = async () => {
    const result = await axios.get(baseDepartmentUrl + props, withAuthHeader())
      .then(response => setDepartment(response.data))
      .catch(error => console.log(error))
  }
  return department;
}
