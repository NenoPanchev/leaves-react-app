import { useEffect, useState } from 'react';
import axios from 'axios';
import { IDepartment, IDepartmentDetails } from '../models/interfaces/department/departmentInterfaces'
import { BASE_DEPARTMENT_URL } from '../constants/GlobalConstants';
import { WITH_AUTH_HEADER } from '../constants/GlobalConstants';


export const useFetchAll = (refresh: number) => {
    const [department, setDepartment] = useState<IDepartment[]>([]);


    useEffect(() => {
      loadDepartments();
    }, [refresh]);
  
    const loadDepartments = async () => {
      const result = await axios.get(BASE_DEPARTMENT_URL, WITH_AUTH_HEADER())
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
    const result = await axios.get(BASE_DEPARTMENT_URL + props, WITH_AUTH_HEADER())
      .then(response => setDepartment(response.data))
      .catch(error => console.log(error))
  }
  return department;
}

export const useCreate = () => {

  const addDepartment = async (department: FormData) => {

    const result = await axios.post(BASE_DEPARTMENT_URL, axios.formToJSON(department), WITH_AUTH_HEADER())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return addDepartment;
}

export const useEdit = () => {

  const editDepartment = async (id: number, role: FormData) => {

    const updateUrl = BASE_DEPARTMENT_URL + id;

    const result = await axios.put(updateUrl, axios.formToJSON(role), WITH_AUTH_HEADER())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return editDepartment;
}

export const useFetchAllFiltered = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const fetchAllFiltered = (refresh: number, filter: FormData) => {

    const loadDepartments = async () => {
      const result = await axios.post(BASE_DEPARTMENT_URL + 'filter', axios.formToJSON(filter), WITH_AUTH_HEADER())
        .then(response =>  {
          
          setDepartments(response.data)
          
        })
        .catch(error => console.log(error))
    }
    loadDepartments();      
    return departments;
  }
  return fetchAllFiltered;
}

export const useFetchAllOrFiltered = (refresh: number, filter: FormData, shouldFilter: boolean) => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
    
    useEffect(() => {
      if (shouldFilter) {
        loadFilteredDepartments();
      } else {
        loadRoles();
      }
    }, [refresh]);

    const loadFilteredDepartments = async () => {
      const result = await axios.post(BASE_DEPARTMENT_URL + 'filter', axios.formToJSON(filter), WITH_AUTH_HEADER())
        .then(response =>  {
          
          setDepartments(response.data)
          
        })
        .catch(error => console.log(error))
    }

  
    const loadRoles = async () => {
      const result = await axios.get(BASE_DEPARTMENT_URL, WITH_AUTH_HEADER())
        .then(response => setDepartments(response.data))
        .catch(error => console.log(error))
    }

    return departments;

}

export const useFetchAllNames = (refresh: number) => {
  const [departmentNames, setDepartmentNames] = useState<string[]>([]);

  useEffect(() => {
    loadDepartment();
  }, [refresh]);

  const loadDepartment = async () => {
    const result = await axios.get(BASE_DEPARTMENT_URL + 'names', WITH_AUTH_HEADER())
      .then(response => setDepartmentNames(response.data))
      .catch(error => console.log(error))
  }

  return departmentNames;
}