export const PERMISSIONS = ['READ', 'WRITE', 'DELETE'];

export const BASE_URL = 'http://localhost:8080';
export const BASE_ROLE_URL = 'http://localhost:8080/roles/';
export const BASE_DEPARTMENT_URL = 'http://localhost:8080/departments/';
export const BASE_USER_URL = 'http://localhost:8080/users/';
export const LOGIN_URL = "http://localhost:8080/authenticate";

export const WITH_AUTH_HEADER = () => ({
  headers: {
    'Authorization': localStorage.getItem('SavedToken')
  }
});