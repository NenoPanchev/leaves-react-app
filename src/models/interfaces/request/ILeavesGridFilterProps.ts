import {ILeavesGridFilter} from "./ILeavesGridFilter";

export interface ILeavesGridFilterProps {
    filter: ILeavesGridFilter,
    setFilter: (value: ILeavesGridFilter) => void;
}