import { useEffect, useState } from 'react';
import { axiosInstance as axios } from '../config/AxiosConfig';
import { formToJSON } from 'axios';
import { BASE_DEPARTMENT_URL, DEFAULT_PAGE, WITH_JSON_HEADER } from '../constants/GlobalConstants';
import { IDepartment } from '../models/interfaces/department/IDepartment';
import { IDepartmentDetails } from '../models/interfaces/department/IDepartmentDetails';
import { IDepartmentPage } from '../models/interfaces/department/IDepartmentPage';
import { IDepartmentFilter } from '../models/interfaces/department/IDepartmentFilter';
import { useNavigate } from 'react-router';

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

export const useFetchOne = (props: number) => {
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

export const useFetchPage = (refresh: number, filter: IDepartmentFilter) => {
  const [page, setPage] = useState<IDepartmentPage>(DEFAULT_PAGE);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPage();
  }, [refresh]);

  const fetchPage = () => {

    const loadPage = async () => {
      const result = await axios.post(BASE_DEPARTMENT_URL + 'page', JSON.stringify(filter), WITH_JSON_HEADER)
        .then(response => {

          setPage(response.data)

        })
        .catch(error => {
          console.log(error)
          if (error.response.status == 403) {
            navigate('/403');
          }
        })
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

export const getAllDepartmentNamesNoRefresh = () => {
  return axios.get(BASE_DEPARTMENT_URL + 'names');
}

export function appendEmployeesToFormData(formData: FormData, employees: string[] | null) {
  if (employees === null) {
    return;
  }
  employees.forEach((emp) => {
    formData.append(`employeeEmails[]`, emp.toString());
  });

}