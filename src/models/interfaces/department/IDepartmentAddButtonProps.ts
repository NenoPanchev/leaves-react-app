export interface IDepartmentAddButtonProps {
    refreshCurrentState: number
    refresh: (value: number) => void;
    userEmails: string[]
    availableEmployeesEmails: string[]
}