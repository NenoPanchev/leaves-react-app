import { useEffect, useState } from 'react';
import { axiosInstance as axios} from '../config/AxiosConfig';
import { formToJSON } from 'axios';
import { IUser, IUserDetails, IUserEdit } from '../models/interfaces/user/userInterfaces'
import { BASE_USER_URL } from '../constants/GlobalConstants';
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

export const useFetchAllFiltered = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchAllFiltered = (refresh: number, filter: FormData) => {
    
    const loadUsers = async () => {
      const result = await axios.post(BASE_USER_URL + 'filter', formToJSON(filter))
        .then(response =>  {
          
          setUsers(response.data)
          
        })
        .catch(error => console.log(error))
    }
    loadUsers();      
    return users;
  }
  return fetchAllFiltered;
}


export const useFetchAllOrFiltered = (refresh: number, filter: FormData, shouldFilter: boolean) => {
  const [users, setUsers] = useState<IUser[]>([]);
    
    useEffect(() => {
      if (shouldFilter) {
        loadFilteredUsers();
      } else {
        loadUsers();
      }
    }, [refresh]);

    const loadFilteredUsers = async () => {
      const result = await axios.post(BASE_USER_URL + 'filter', formToJSON(filter))
        .then(response =>  {
          
          setUsers(response.data)
          
        })
        .catch(error => console.log(error))
    }

    const loadUsers = async () => {
      const result = await axios.get(BASE_USER_URL)
        .then(response => setUsers(response.data))
        .catch(error => console.log(error))
    }

    return users;
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