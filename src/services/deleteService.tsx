import { useEffect, useState } from 'react';
import axios from 'axios';

const baseRoleUrl = 'http://localhost:8080/'

const withAuthHeader = () => ({
    headers: {
      'Authorization': localStorage.getItem('SavedToken')
    }
  });

interface DeleteProp {
    id: number
    path: string
}

export const useDelete = (props: DeleteProp) => {
    console.log(props.path);
    
}