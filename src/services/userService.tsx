import { useEffect, useState } from 'react';
import { axiosInstance as axios} from '../config/AxiosConfig';
import { formToJSON } from 'axios';
import { IUser, IUserDetails, IUserEdit, IUserFilter, IUserPage } from '../models/interfaces/user/userInterfaces'
import { BASE_USER_URL, WITH_JSON_HEADER } from '../constants/GlobalConstants';
import { Role } from '../models/objects/Role';


export const useFetchAll = (refresh: number) => {
    const [user, setUser] = useState<IUser[]>([]);


    useEffect(() => {
      loadUsers();
    }, [refresh]);
  
    const loadUsers = async () => {
      const result = await axios.get(BASE_USER_URL)
        .then(response => setUser(response.data))
        .catch(error => console.log(error))
        
    } 

    return user;
}

export const useFetchOne = (props:number) => {
    const [user, setUser] = useState<IUserDetails>();
    
  useEffect(() => {
    loadDepartment();
  }, []);
  

  const loadDepartment = async () => {
    const result = await axios.get(BASE_USER_URL + props)
      .then(response => setUser(response.data))
      .catch(error => console.log(error))
  }
  return user;
}

export const useCreate = () => {

  const addUser = async (user: FormData) => {    
    const result = await axios.post(BASE_USER_URL, formToJSON(user))
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return addUser;
}

export const useFetchPage = (refresh: number, filter: IUserFilter) => {
  const [page, setPage] = useState<IUserPage>({
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
      const result = await axios.post(BASE_USER_URL + 'page', JSON.stringify(filter), WITH_JSON_HEADER)
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

export const useEdit = () => {

  const editUser = async (id: number, role: FormData) => {

    const updateUrl = BASE_USER_URL + id;

    const result = await axios.put(updateUrl, formToJSON(role))
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return editUser;
}

export const useFetchAllEmails = (refresh: number) => {
  const [userEmails, setUserEmails] = useState<string[]>([]);

  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    const result = await axios.get(BASE_USER_URL + 'emails')
      .then(response => setUserEmails(response.data))
      .catch(error => console.log(error))
  }

  return userEmails;
}

export const useFetchEmailsOfAvailableEmployees = (refresh: number) => {
  const [userEmails, setUserEmails] = useState<string[]>([]);

  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    const result = await axios.get(BASE_USER_URL + 'available')
      .then(response => setUserEmails(response.data))
      .catch(error => console.log(error))
  }

  return userEmails;
}

export function appendRolesToFormData(formData: FormData, roles: Role[] | null) {
  if (roles === null) {
    const role = new Role();
    role.setName('USER');
    roles = new Array();
    roles.push(role); 
  }
  roles.forEach((obj, index) => {
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(`roles[${index}][${key}]`, value.toString());
    });
  });
}