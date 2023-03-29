export interface IDepartment {
    id: number
    name: string
    adminEmail: string
    employeeEmails: string[]
  }

export interface IDepartmentDetails {
    id: number,
    name: string,
    adminEmail: string,
    employeeEmails: string[]
    createdAt: string
    createdBy?: string
    lastModifiedAt?: string
    lastModifiedBy?: string
  }

export interface EditDepartmentButtonProps {
    department: IDepartment
    refreshCurrentState: number
    refresh: (value: number) => void;
    userEmails: string[]
}

export interface DepartmentSearchFilterProps {
  refreshCurrentState: number
  refresh: (value: number) => void;
  setRoles: (value: IDepartment[]) => void;
  setFilter: (value: FormData) => void;
  setShouldFilter: (value: boolean) => void;
}

export interface AddDepartmentButtonProps {
  refreshCurrentState: number
  refresh: (value: number) => void;
  userEmails: string[]
}
