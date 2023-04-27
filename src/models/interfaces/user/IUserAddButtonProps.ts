export interface IUserAddButtonProps {
    refreshCurrentState: number
    refresh: (value: number) => void;
    departmentNames: string[]
    roleNames: string[]
    typeNames: string[]
}