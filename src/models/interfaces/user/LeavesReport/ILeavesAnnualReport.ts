import { IContractBreakdown } from "./IContractBreakdown";

export interface ILeavesAnnualReport {
    year: number,
    contractBreakdowns: IContractBreakdown[],
    fromPreviousYear: number,
    daysUsed: number,
    contractDays: number,
    carryoverDays: number
}