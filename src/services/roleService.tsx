import { useEffect, useState } from 'react';
import axios from 'axios';

const baseRoleUrl = 'http://localhost:8080/roles/'

const withAuthHeader = () => ({
  headers: {
    'Authorization': localStorage.getItem('SavedToken')
  }
});


type Role = {
  id: number
  name: string
  permissions: [{
    name: string
  }]
}

interface RoleViewProp {
  id: number
}

type RoleDetails = {
  id: number
  name: string
  permissions: [{
    name: string
  }]
  createdAt: string
  createdBy?: string
  lastModifiedAt?: string
  lastModifiedBy?: string
}

export const useFetchAll = (refresh: number) => {
  const [roles, setRoles] = useState<Role[]>([]);


  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    const result = await axios.get(baseRoleUrl, withAuthHeader())
      .then(response => setRoles(response.data))
      .catch(error => console.log(error))
  }

  return roles;
}

export const useFetchOne = (props: number) => {
  const [role, setRole] = useState<RoleDetails>();

  useEffect(() => {
    loadRole();
  }, []);


  const loadRole = async () => {
    const result = await axios.get(baseRoleUrl + props, withAuthHeader())
      .then(response => setRole(response.data))
      .catch(error => console.log(error))
  }
  return role;
}

export const useCreate = () => {

  const addRole = async (role: FormData) => {

    const result = await axios.post(baseRoleUrl, axios.formToJSON(role), withAuthHeader())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return addRole;
}

export const useEdit = () => {

  const editRole = async (role: FormData) => {

    const updateUrl = baseRoleUrl + '/' + role.get('id');

    const result = await axios.put(updateUrl, axios.formToJSON(role), withAuthHeader())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return editRole;
}
