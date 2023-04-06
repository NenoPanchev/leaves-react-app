export const PERMISSIONS = ['READ', 'WRITE', 'DELETE'];

export const BASE_URL = 'http://localhost:8080';
export const BASE_ROLE_URL = 'http://localhost:8080/roles/';
export const BASE_DEPARTMENT_URL = 'http://localhost:8080/departments/';
export const BASE_USER_URL = 'http://localhost:8080/users/';
export const LOGIN_URL = "http://localhost:8080/authenticate";
export const DEFAULT_OFFSET = 0;
export const DEFAULT_LIMIT = 30;
export const WITH_TEXT_HEADER = {
  headers: {
    'Content-Type': 'text/plain'
  }
}

export const WITH_AUTH_HEADER = () => ({
  headers: {
    'Authorization': localStorage.getItem('SavedToken')
  }
});

export function FC_WITH_STRING_AUTH_HEADER()
{
  return {'Authorization': localStorage.getItem('SavedToken')}
}