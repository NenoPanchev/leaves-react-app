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

export interface EditButtonProps {
    department: IDepartment
    refreshCurrentState: number
    refresh: (value: number) => void;
}

export interface DepartmentSearchFilterProps {
  refreshCurrentState: number
  refresh: (value: number) => void;
  setRoles: (value: IDepartment[]) => void;
  setFilter: (value: FormData) => void;
  setShouldFilter: (value: boolean) => void;
}