import { IContract } from "./IContract";
import { IContractFilter } from "./IContractFilter";

export interface IContractEditButtonProps {
    contract: IContract
    refreshCounter: number
    setRefreshCounter: (value: number) => void;
    typeNames: string[]
}