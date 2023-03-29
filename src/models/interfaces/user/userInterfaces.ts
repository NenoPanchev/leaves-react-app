export interface IUser {
    id: number
    name: string
    email: string
    department: string
    roles: [{
      name: string
    }]
}

export interface IUserEdit {
  id: number
  name: string
  email: string
  department: string
  roles: [{
    name: string
  }]
  password: string
  passwordConfirm: string
}

export interface IUserDetails {
    id: number
    name: string
    email: string
    department: string
    roles: [{
      name: string
      permissions: [{
        name: string
      }]}]
    createdAt: string
    createdBy?: string
    lastModifiedAt?: string
    lastModifiedBy?: string
}

export interface UserSearchFilterProps {
  refreshCurrentState: number
  refresh: (value: number) => void;
  setUsers: (value: IUser[]) => void;
  setFilter: (value: FormData) => void;
  setShouldFilter: (value: boolean) => void;
}

export interface AddUserButtonProps {
  refreshCurrentState: number
  refresh: (value: number) => void;
  departmentNames: string[]
  roleNames: string[]
}

export interface EditUserButtonProps {
  user: IUserEdit
  refreshCurrentState: number
  refresh: (value: number) => void;
  departmentNames: string[]
  roleNames: string[]
}