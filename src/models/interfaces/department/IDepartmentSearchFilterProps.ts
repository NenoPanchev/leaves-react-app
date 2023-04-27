import { IDepartmentFilter } from "./IDepartmentFilter";

export interface IDepartmentSearchFilterProps {
    refreshCurrentState: number
    refresh: (value: number) => void;
    filter: IDepartmentFilter;
    setFilter: (value: IDepartmentFilter) => void;
}