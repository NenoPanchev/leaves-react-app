import { IUserFilter } from "./IUserFilter";

export interface IUserSearchFilterProps {
    refreshCurrentState: number
    refresh: (value: number) => void;
    filter: IUserFilter;
    setFilter: (value: IUserFilter) => void;
    typeNames: string[];
    departmentNames: string[];
}