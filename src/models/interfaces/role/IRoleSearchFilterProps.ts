import { IRoleFilter } from "./IRoleFilter";

export interface IRoleSearchFilterProps {
    refreshCurrentState: number
    refresh: (value: number) => void;
    filter: IRoleFilter;
    setFilter: (value: IRoleFilter) => void;
}