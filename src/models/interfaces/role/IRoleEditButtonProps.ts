import { IRole } from "./IRole";

export interface IEditRoleButtonProps {
    role: IRole
    refreshCurrentState: number
    refresh: (value: number) => void;
}