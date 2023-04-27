import { IDepartment } from "./IDepartment";

export interface IDepartmentEditButtonProps {
    department: IDepartment
    refreshCurrentState: number
    refresh: (value: number) => void;
    userEmails: string[]
    availableEmployeesEmails: string[]
}