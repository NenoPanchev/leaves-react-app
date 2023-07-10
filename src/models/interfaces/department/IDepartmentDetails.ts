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