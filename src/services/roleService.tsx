import { useEffect, useState } from 'react';
import axios from 'axios';

const baseRoleUrl = 'http://localhost:8080/roles/'

const withAuthHeader = () => ({
    headers: {
      'Authorization': localStorage.getItem('SavedToken')
    }
  });


type Role = {
    id: number,
    name: string,
    permissions: [{
      name: string
    }]
}

  interface RoleViewProp {
    id: number
}

type RoleDetails = {
    id: number,
    name: string,
    permissions: [{
      name: string
    }]
    createdAt: string
    createdBy?: string
    lastModifiedAt?: string
    lastModifiedBy?: string
}

export const useFetchAll = () => {
    const [roles, setRoles] = useState<Role[]>([]);


    useEffect(() => {
      loadRoles();
    }, []);
  
    const loadRoles = async () => {
      const result = await axios.get(baseRoleUrl, withAuthHeader())
        .then(response => setRoles(response.data))
        .catch(error => console.log(error))
    } 

    return roles;
}

export const useFetchOne = (props:number) => {
    const [role, setRole] = useState<RoleDetails>();
    const getFormattedDate = (dateStr:string) => {
        const date = new Date(dateStr);
        return date.toLocaleString;
    }
    const createdAtData = role?.createdAt;
    
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
