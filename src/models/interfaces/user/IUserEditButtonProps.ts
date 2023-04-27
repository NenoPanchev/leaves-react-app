import { IUserEdit } from "./IUserEdit";

export interface IUserEditButtonProps {
    user: IUserEdit
    refreshCurrentState: number
    refresh: (value: number) => void;
    departmentNames: string[]
    roleNames: string[]
    typeNames: string[]
}