import { useEffect, useState } from 'react';
import { axiosInstance as axios} from '../config/AxiosConfig';
import { formToJSON } from 'axios';
import { IDepartment, IDepartmentDetails, IDepartmentFilter, IDepartmentPage } from '../models/interfaces/department/departmentInterfaces'
import { BASE_DEPARTMENT_URL, WITH_JSON_HEADER } from '../constants/GlobalConstants';

export const useFetchAll = (refresh: number) => {
    const [department, setDepartment] = useState<IDepartment[]>([]);


    useEffect(() => {
      loadDepartments();
    }, [refresh]);
  
    const loadDepartments = async () => {
      const result = await axios.get(BASE_DEPARTMENT_URL)
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
    const result = await axios.get(BASE_DEPARTMENT_URL + props)
      .then(response => setDepartment(response.data))
      .catch(error => console.log(error))
  }
  return department;
}

export const useCreate = () => {

  const addDepartment = async (department: FormData) => {

    const result = await axios.post(BASE_DEPARTMENT_URL, formToJSON(department))
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

    const result = await axios.put(updateUrl, formToJSON(role))
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
      const result = await axios.post(BASE_DEPARTMENT_URL + 'filter', formToJSON(filter))
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
      const result = await axios.post(BASE_DEPARTMENT_URL + 'filter', formToJSON(filter))
        .then(response =>  {
          
          setDepartments(response.data)
          
        })
        .catch(error => console.log(error))
    }

  
    const loadRoles = async () => {
      const result = await axios.get(BASE_DEPARTMENT_URL)
        .then(response => setDepartments(response.data))
        .catch(error => console.log(error))
    }

    return departments;

}

export const useFetchPage = (refresh: number, filter: IDepartmentFilter) => {
  const [page, setPage] = useState<IDepartmentPage>({
    content: [],
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 5,
    number: 0,
    size: 5,
    first: true,
    last: true
  });
  useEffect(() => {
    fetchPage();
  }, [refresh]);

  const fetchPage = () => {
    
    const loadPage = async () => {
      const result = await axios.post(BASE_DEPARTMENT_URL + 'page', JSON.stringify(filter), WITH_JSON_HEADER)
        .then(response =>  {
          
          setPage(response.data)
          
        })
        .catch(error => console.log(error))
    }
    loadPage();      
    return page;
  }
  return page;
}

export const useFetchAllNames = (refresh: number) => {
  const [departmentNames, setDepartmentNames] = useState<string[]>([]);

  useEffect(() => {
    loadDepartment();
  }, [refresh]);

  const loadDepartment = async () => {
    const result = await axios.get(BASE_DEPARTMENT_URL + 'names')
      .then(response => setDepartmentNames(response.data))
      .catch(error => console.log(error))
  }

  return departmentNames;
}

export function appendEmployeesToFormData(formData: FormData, employees: string[] | null) {
  if (employees === null) {
    return; 
  }
  employees.forEach((emp) => {
      formData.append(`employeeEmails[]`, emp.toString());
    });
  
}