import { GridRowId } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { IUserEdit } from "./IUserEdit";

export interface IUserEditButtonProps {
    user: IUserEdit
    refreshCurrentState: number
    refresh: (value: number) => void;
    departmentNames: string[]
    roleNames: string[]
    typeNames: string[]
    rowId: GridRowId,
    apiRef: GridApiCommunity
}