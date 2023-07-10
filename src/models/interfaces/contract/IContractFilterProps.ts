import { IContractFilter } from "./IContractFilter";

export interface IContractFilterProps {
    refreshCounter: number
    setRefreshCounter: (value: number) => void;
    filter: IContractFilter;
    setFilter: (value: IContractFilter) => void;
    typeNames: string[];
}