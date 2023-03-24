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

export const useCreate = () => {

  const addDepartment = async (department: FormData) => {

    const result = await axios.post(baseDepartmentUrl, axios.formToJSON(department), withAuthHeader())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return addDepartment;
}

export const useEdit = () => {

  const editDepartment = async (id: number, role: FormData) => {

    const updateUrl = baseDepartmentUrl + id;

    const result = await axios.put(updateUrl, axios.formToJSON(role), withAuthHeader())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return editDepartment;
}