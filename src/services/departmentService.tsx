import { useEffect, useState } from 'react';
import axios from 'axios';
import { IDepartment, IDepartmentDetails } from '../models/interfaces/department/departmentInterfaces'

const baseDepartmentUrl = 'http://localhost:8080/departments/'

const withAuthHeader = () => ({
    headers: {
      'Authorization': localStorage.getItem('SavedToken')
    }
  });


export const useFetchAll = (refresh: number) => {
    const [department, setDepartment] = useState<IDepartment[]>([]);


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
    const [department, setDepartment] = useState<IDepartmentDetails>();
    
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