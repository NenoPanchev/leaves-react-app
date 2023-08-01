export interface IDaysUsedByMonth {
    name: string,
    monthDaysUsed: { [month: string]: number[] };
}